package com.newscraft.service;

import com.newscraft.client.NewsApiClient;
import com.newscraft.client.NewsApiSource;
import com.newscraft.client.NewsApiSourcesResponse;
import com.newscraft.dto.CountryCode;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsSourceService {
    private static final Duration SOURCE_TTL = Duration.ofHours(12);

    private final NewsApiClient newsApiClient;
    private final Clock clock;
    private final Map<CountryCode, CachedSources> cache = new ConcurrentHashMap<>();

    @Autowired
    public NewsSourceService(NewsApiClient newsApiClient) {
        this(newsApiClient, Clock.systemUTC());
    }

    NewsSourceService(NewsApiClient newsApiClient, Clock clock) {
        this.newsApiClient = newsApiClient;
        this.clock = clock;
    }

    public List<NewsApiSource> sourcesFor(CountryCode country) {
        CachedSources cached = cache.get(country);
        Instant now = clock.instant();
        if (cached != null && cached.expiresAt().isAfter(now)) {
            return cached.sources();
        }

        NewsApiSourcesResponse response = newsApiClient.sources(country);
        List<NewsApiSource> sources = response.sources() == null
                ? List.of()
                : response.sources().stream()
                        .filter(source -> source.id() != null && !source.id().isBlank())
                        .map(source -> normalizeCountry(source, country))
                        .toList();

        cache.put(country, new CachedSources(sources, now.plus(SOURCE_TTL)));
        return sources;
    }

    private NewsApiSource normalizeCountry(NewsApiSource source, CountryCode country) {
        String sourceCountry = source.country() == null || source.country().isBlank()
                ? country.apiCode()
                : source.country().toLowerCase(Locale.ROOT);
        return new NewsApiSource(
                source.id(),
                source.name(),
                source.description(),
                source.url(),
                source.category(),
                source.language(),
                sourceCountry
        );
    }

    private record CachedSources(List<NewsApiSource> sources, Instant expiresAt) {
    }
}
