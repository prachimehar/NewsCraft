package com.newscraft.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.newscraft.client.NewsApiArticle;
import com.newscraft.client.NewsApiClient;
import com.newscraft.client.NewsApiResponse;
import com.newscraft.client.NewsApiSource;
import com.newscraft.dto.CountryCode;
import com.newscraft.dto.NewsCategory;
import com.newscraft.dto.NewsResponse;
import com.newscraft.exception.NewsApiException;
import java.time.OffsetDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
class NewsServiceTest {
    @Mock
    private NewsApiClient newsApiClient;

    @Mock
    private NewsSourceService newsSourceService;

    @InjectMocks
    private NewsService newsService;

    @Test
    void usCountryRequestUsesDirectCountryHeadlinesWhenResultsExist() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(1));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles()).hasSize(1);
        assertThat(response.data().articles().getFirst().country()).isEqualTo("United States");
        assertThat(response.data().articles().getFirst().countryCode()).isEqualTo("us");
        assertThat(response.data().articles().getFirst().category()).isEqualTo("General");
        verify(newsSourceService, never()).sourcesFor(any());
    }

    @Test
    void indiaCountryRequestFallsBackToIndianSourcesWhenCountryAggregationReturnsZero() {
        when(newsApiClient.topHeadlines(CountryCode.IN, null, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.topHeadlinesBySources(List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-hindu", "The Hindu")));

        NewsResponse response = newsService.getNews("in", null, 1, 12, null);

        assertThat(response.data().totalResults()).isEqualTo(1);
        assertThat(response.data().articles().getFirst().country()).isEqualTo("India");
        assertThat(response.data().articles().getFirst().countryCode()).isEqualTo("in");
        assertThat(response.data().articles().getFirst().sourceId()).isEqualTo("the-hindu");
        assertThat(response.data().articles().getFirst().sourceName()).isEqualTo("The Hindu");
    }

    @Test
    void ukCountryRequestKeepsUnitedKingdomContextOnlyWhenRequested() {
        when(newsApiClient.topHeadlines(CountryCode.GB, null, null, 1, 12))
                .thenReturn(response(1));

        NewsResponse response = newsService.getNews("gb", null, 1, 12, null);

        assertThat(response.data().articles().getFirst().country()).isEqualTo("United Kingdom");
        assertThat(response.data().articles().getFirst().countryCode()).isEqualTo("gb");
    }

    @Test
    void indiaSourceDiscoveryUsesSourceService() {
        when(newsApiClient.topHeadlines(CountryCode.IN, null, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.topHeadlinesBySources(List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-hindu", "The Hindu")));

        newsService.getNews("in", null, 1, 12, null);

        verify(newsSourceService).sourcesFor(CountryCode.IN);
    }

    @Test
    void indiaSourceBasedRetrievalUsesSingleSourcesRequest() {
        when(newsApiClient.topHeadlines(CountryCode.IN, null, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.topHeadlinesBySources(List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-hindu", "The Hindu")));

        newsService.getNews("in", null, 1, 12, null);

        verify(newsApiClient).topHeadlinesBySources(List.of("the-hindu", "the-times-of-india"), 1, 12);
    }

    @Test
    void googleNewsAggregatorIsUsedOnlyWhenNoDirectPublisherExists() {
        when(newsApiClient.topHeadlines(CountryCode.IN, null, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(List.of(indiaSource()));
        when(newsApiClient.topHeadlinesBySources(List.of("google-news-in"), 1, 12))
                .thenReturn(response(article("google-news-in", "Google News (India)")));

        newsService.getNews("in", null, 1, 12, null);

        verify(newsApiClient).topHeadlinesBySources(List.of("google-news-in"), 1, 12);
    }

    @Test
    void indiaTechnologyFallsBackToEverythingScopedToIndianSources() {
        when(newsApiClient.topHeadlines(CountryCode.IN, NewsCategory.TECHNOLOGY, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.everythingBySources("technology", List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-times-of-india", "The Times of India")));

        NewsResponse response = newsService.getNews("in", "technology", 1, 12, null);

        assertThat(response.data().articles().getFirst().country()).isEqualTo("India");
        assertThat(response.data().articles().getFirst().countryCode()).isEqualTo("in");
        assertThat(response.data().articles().getFirst().category()).isEqualTo("Technology");
        verify(newsApiClient).everythingBySources("technology", List.of("the-hindu", "the-times-of-india"), 1, 12);
    }

    @Test
    void indiaBusinessFallsBackToEverythingScopedToIndianSources() {
        when(newsApiClient.topHeadlines(CountryCode.IN, NewsCategory.BUSINESS, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.everythingBySources("business", List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-hindu", "The Hindu")));

        NewsResponse response = newsService.getNews("in", "business", 1, 12, null);

        assertThat(response.data().articles().getFirst().category()).isEqualTo("Business");
    }

    @Test
    void indiaSportsFallsBackToEverythingScopedToIndianSources() {
        when(newsApiClient.topHeadlines(CountryCode.IN, NewsCategory.SPORTS, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.IN)).thenReturn(indiaSources());
        when(newsApiClient.everythingBySources("sports", List.of("the-hindu", "the-times-of-india"), 1, 12))
                .thenReturn(response(article("the-hindu", "The Hindu")));

        NewsResponse response = newsService.getNews("in", "sports", 1, 12, null);

        assertThat(response.data().articles().getFirst().category()).isEqualTo("Sports");
    }

    @Test
    void searchWithoutCountryUsesEverythingAndGlobalContext() {
        when(newsApiClient.everything("artificial intelligence", 1, 12)).thenReturn(response(article("example", "Example Source")));

        NewsResponse response = newsService.getNews(null, null, 1, 12, "artificial intelligence");

        assertThat(response.data().articles().getFirst().country()).isEqualTo("Global");
        assertThat(response.data().articles().getFirst().countryCode()).isNull();
        assertThat(response.data().articles().getFirst().category()).isEqualTo("General");
        verify(newsApiClient, never()).topHeadlines(any(), any(), any(), anyInt(), anyInt());
    }

    @Test
    void invalidCountryFailsBeforeNewsApiCall() {
        assertThatThrownBy(() -> newsService.getNews("xyz", null, 1, 12, null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Unsupported country code: xyz");
    }

    @Test
    void invalidCategoryFailsBeforeNewsApiCall() {
        assertThatThrownBy(() -> newsService.getNews("in", "politics", 1, 12, null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Unsupported category: politics");
    }

    @Test
    void newsApiFailureIsNotSwallowed() {
        when(newsApiClient.topHeadlines(CountryCode.IN, null, null, 1, 12))
                .thenThrow(new NewsApiException(HttpStatus.SERVICE_UNAVAILABLE, "Unable to reach NewsAPI"));

        assertThatThrownBy(() -> newsService.getNews("in", null, 1, 12, null))
                .isInstanceOf(NewsApiException.class)
                .hasMessage("Unable to reach NewsAPI");
    }

    @Test
    void zeroResultFallbackReturnsCleanEmptyResponseWhenNoSourcesExist() {
        when(newsApiClient.topHeadlines(CountryCode.AR, null, null, 1, 12))
                .thenReturn(emptyResponse());
        when(newsSourceService.sourcesFor(CountryCode.AR)).thenReturn(List.of());

        NewsResponse response = newsService.getNews("ar", null, 1, 12, null);

        assertThat(response.data().totalResults()).isZero();
        assertThat(response.data().articles()).isEmpty();
        verify(newsApiClient, never()).topHeadlinesBySources(any(), anyInt(), anyInt());
    }

    @Test
    void duplicateArticlesAreRemovedByUrl() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(
                        article("associated-press", "Associated Press", "https://example.com/same"),
                        article("associated-press", "Associated Press", "https://example.com/same")
                ));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles()).hasSize(1);
        assertThat(response.data().totalResults()).isEqualTo(1);
    }

    @Test
    void htmlIsCleanedFromDescriptionAndContent() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(article(
                        "associated-press",
                        "Associated Press",
                        "Real title",
                        "<ol><li>Readable description</li></ol>",
                        "<p>Readable content</p>",
                        "https://example.com/html",
                        "Author",
                        "https://example.com/image.jpg"
                )));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles().getFirst().description()).isEqualTo("Readable description");
        assertThat(response.data().articles().getFirst().content()).isEqualTo("Readable content");
    }

    @Test
    void missingAuthorAndImageRemainNull() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(article(
                        "associated-press",
                        "Associated Press",
                        "Real title",
                        "Description",
                        "Content",
                        "https://example.com/no-author",
                        null,
                        null
                )));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles().getFirst().author()).isNull();
        assertThat(response.data().articles().getFirst().imageUrl()).isNull();
    }

    @Test
    void articlesWithMissingUrlAreRejected() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(article(
                        "associated-press",
                        "Associated Press",
                        "Real title",
                        "Description",
                        "Content",
                        null,
                        "Author",
                        "https://example.com/image.jpg"
                )));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles()).isEmpty();
        assertThat(response.data().totalResults()).isZero();
    }

    @Test
    void genericGoogleNewsRecordsAreRejected() {
        when(newsApiClient.topHeadlines(CountryCode.US, null, null, 1, 12))
                .thenReturn(response(article(
                        "google-news",
                        "Google News",
                        "Google News",
                        "Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.",
                        "<ol><li>Aggregator item</li></ol>",
                        "https://news.google.com",
                        null,
                        null
                )));

        NewsResponse response = newsService.getNews("us", null, 1, 12, null);

        assertThat(response.data().articles()).isEmpty();
    }

    private NewsApiResponse emptyResponse() {
        return new NewsApiResponse("ok", 0, List.of(), null, null);
    }

    private NewsApiResponse response(int totalResults) {
        return response(article("example", "Example Source"));
    }

    private NewsApiResponse response(NewsApiArticle... articles) {
        return new NewsApiResponse("ok", articles.length, List.of(articles), null, null);
    }

    private NewsApiArticle article(String sourceId, String sourceName) {
        return article(sourceId, sourceName, "https://example.com/news");
    }

    private NewsApiArticle article(String sourceId, String sourceName, String url) {
        return article(
                sourceId,
                sourceName,
                "Example Title",
                "Example Description",
                "Example Content",
                url,
                "Example Author",
                "https://example.com/image.jpg"
        );
    }

    private NewsApiArticle article(
            String sourceId,
            String sourceName,
            String title,
            String description,
            String content,
            String url,
            String author,
            String imageUrl
    ) {
        return new NewsApiArticle(
                source(sourceId, sourceName, "in"),
                author,
                title,
                description,
                url,
                imageUrl,
                OffsetDateTime.parse("2026-08-17T10:00:00Z"),
                content
        );
    }

    private NewsApiSource indiaSource() {
        return source("google-news-in", "Google News (India)", "in");
    }

    private List<NewsApiSource> indiaSources() {
        return List.of(
                indiaSource(),
                source("the-hindu", "The Hindu", "in"),
                source("the-times-of-india", "The Times of India", "in")
        );
    }

    private NewsApiSource source(String id, String name, String country) {
        return new NewsApiSource(id, name, null, null, null, "en", country);
    }
}
