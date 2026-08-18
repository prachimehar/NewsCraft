package com.newscraft.service;

import com.newscraft.client.NewsApiArticle;
import com.newscraft.client.NewsApiClient;
import com.newscraft.client.NewsApiResponse;
import com.newscraft.client.NewsApiSource;
import com.newscraft.dto.CountryCode;
import com.newscraft.dto.NewsArticleResponse;
import com.newscraft.dto.NewsCategory;
import com.newscraft.dto.NewsData;
import com.newscraft.dto.NewsResponse;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

@Service
public class NewsService {
    private static final int DEFAULT_PAGE = 1;
    private static final int DEFAULT_PAGE_SIZE = 12;
    private static final int MAX_PAGE_SIZE = 100;
    private static final int MAX_SOURCE_IDS = 20;

    private final NewsApiClient newsApiClient;
    private final NewsSourceService newsSourceService;

    public NewsService(NewsApiClient newsApiClient, NewsSourceService newsSourceService) {
        this.newsApiClient = newsApiClient;
        this.newsSourceService = newsSourceService;
    }

    public NewsResponse getNews(String countryParam, String categoryParam, Integer page, Integer pageSize, String query) {
        CountryCode country = CountryCode.from(countryParam);
        NewsCategory category = NewsCategory.from(categoryParam);
        int resolvedPage = normalizePage(page);
        int resolvedPageSize = normalizePageSize(pageSize);
        boolean useEverything = shouldUseEverything(countryParam, categoryParam, query);

        if (useEverything) {
            NewsApiResponse apiResponse = newsApiClient.everything(query, resolvedPage, resolvedPageSize);
            return NewsResponse.ok(normalize(apiResponse, "Global", null, category, Map.of()));
        }

        NewsApiResponse apiResponse = newsApiClient.topHeadlines(country, category, query, resolvedPage, resolvedPageSize);
        if (apiResponse.totalResults() > 0) {
            return NewsResponse.ok(normalize(apiResponse, country.displayName(), country.apiCode(), category, Map.of()));
        }

        List<NewsApiSource> sources = newsSourceService.sourcesFor(country);
        if (sources.isEmpty()) {
            return NewsResponse.ok(normalize(apiResponse, country.displayName(), country.apiCode(), category, Map.of()));
        }

        List<NewsApiSource> selectedSources = selectPreferredSources(sources);
        List<String> sourceIds = selectedSources.stream()
                .map(NewsApiSource::id)
                .limit(MAX_SOURCE_IDS)
                .toList();
        Map<String, NewsApiSource> sourcesById = selectedSources.stream()
                .filter(source -> source.id() != null)
                .collect(Collectors.toMap(NewsApiSource::id, Function.identity(), (first, ignored) -> first));

        NewsApiResponse sourceResponse = category == null
                ? newsApiClient.topHeadlinesBySources(sourceIds, resolvedPage, resolvedPageSize)
                : newsApiClient.everythingBySources(category.apiValue(), sourceIds, resolvedPage, resolvedPageSize);

        return NewsResponse.ok(normalize(sourceResponse, country.displayName(), country.apiCode(), category, sourcesById));
    }

    private NewsData normalize(
            NewsApiResponse apiResponse,
            String country,
            String countryCode,
            NewsCategory category,
            Map<String, NewsApiSource> sourcesById
    ) {
        List<NewsArticleResponse> articles = apiResponse.articles() == null
                ? List.of()
                : apiResponse.articles().stream()
                        .filter(this::isUsableArticle)
                        .map(article -> normalize(article, country, countryCode, category, sourcesById))
                        .collect(Collectors.collectingAndThen(
                                Collectors.toMap(
                                        article -> article.url().trim().toLowerCase(),
                                        Function.identity(),
                                        (first, ignored) -> first,
                                        LinkedHashMap::new
                                ),
                                deduped -> List.copyOf(deduped.values())
                        ));

        return new NewsData(articles.size(), articles);
    }

    private boolean shouldUseEverything(String countryParam, String categoryParam, String query) {
        return query != null && !query.isBlank()
                && (countryParam == null || countryParam.isBlank())
                && (categoryParam == null || categoryParam.isBlank());
    }

    private NewsArticleResponse normalize(
            NewsApiArticle article,
            String country,
            String countryCode,
            NewsCategory category,
            Map<String, NewsApiSource> sourcesById
    ) {
        String sourceId = article.source() == null ? null : article.source().id();
        NewsApiSource sourceMetadata = sourceId == null ? null : sourcesById.get(sourceId);
        String sourceName = article.source() == null ? null : article.source().name();
        if ((sourceName == null || sourceName.isBlank()) && sourceMetadata != null) {
            sourceName = sourceMetadata.name();
        }

        return new NewsArticleResponse(
                cleanText(article.title()),
                cleanText(article.description()),
                cleanText(article.content()),
                cleanNullable(article.url()),
                cleanNullable(article.urlToImage()),
                cleanText(sourceName),
                sourceId,
                cleanNullable(article.author()),
                country,
                countryCode,
                category == null ? "General" : category.displayName(),
                article.publishedAt()
        );
    }

    private List<NewsApiSource> selectPreferredSources(List<NewsApiSource> sources) {
        List<NewsApiSource> directSources = sources.stream()
                .filter(source -> !isAggregatorSource(source))
                .toList();

        return directSources.isEmpty() ? sources : directSources;
    }

    private boolean isAggregatorSource(NewsApiSource source) {
        String id = source.id() == null ? "" : source.id().trim().toLowerCase();
        String name = source.name() == null ? "" : source.name().trim().toLowerCase();
        return id.equals("google-news")
                || id.startsWith("google-news-")
                || name.equals("google news")
                || name.startsWith("google news (");
    }

    private boolean isUsableArticle(NewsApiArticle article) {
        if (article == null) {
            return false;
        }
        String title = cleanText(article.title());
        if (title == null || isGenericAggregatorTitle(title)) {
            return false;
        }
        String description = cleanText(article.description());
        if (isGenericAggregatorDescription(description)) {
            return false;
        }
        if (cleanNullable(article.url()) == null) {
            return false;
        }
        return article.source() != null
                && (cleanNullable(article.source().id()) != null || cleanNullable(article.source().name()) != null);
    }

    private boolean isGenericAggregatorTitle(String title) {
        String normalized = title.trim().toLowerCase();
        return normalized.equals("google news")
                || normalized.equals("news")
                || normalized.equals("top headlines")
                || normalized.equals("latest news");
    }

    private boolean isGenericAggregatorDescription(String description) {
        if (description == null) {
            return false;
        }
        String normalized = description.toLowerCase();
        return normalized.contains("comprehensive up-to-date news coverage")
                && normalized.contains("google news");
    }

    private String cleanText(String value) {
        String cleaned = cleanNullable(value);
        if (cleaned == null) {
            return null;
        }
        String text = Jsoup.parse(cleaned).text().trim();
        return text.isBlank() ? null : text;
    }

    private String cleanNullable(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }

    private int normalizePage(Integer page) {
        if (page == null) {
            return DEFAULT_PAGE;
        }
        if (page < 1) {
            throw new IllegalArgumentException("page must be greater than 0");
        }
        return page;
    }

    private int normalizePageSize(Integer pageSize) {
        if (pageSize == null) {
            return DEFAULT_PAGE_SIZE;
        }
        if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            throw new IllegalArgumentException("pageSize must be between 1 and " + MAX_PAGE_SIZE);
        }
        return pageSize;
    }
}
