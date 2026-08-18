package com.newscraft.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.newscraft.config.NewsApiConfig;
import com.newscraft.dto.CountryCode;
import com.newscraft.dto.NewsCategory;
import com.newscraft.exception.NewsApiException;
import java.time.Duration;
import java.util.List;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.util.UriBuilder;

@Component
public class NewsApiClient {
    private final RestClient restClient;
    private final NewsApiConfig config;
    private final ObjectMapper objectMapper;

    public NewsApiClient(RestClient.Builder builder, NewsApiConfig config, ObjectMapper objectMapper) {
        this.config = config;
        this.objectMapper = objectMapper;
        Duration timeout = config.timeout() == null ? Duration.ofSeconds(5) : config.timeout();
        this.restClient = builder
                .baseUrl(config.baseUrl())
                .requestFactory(ClientHttpRequestFactories.get(ClientHttpRequestFactorySettings.DEFAULTS
                        .withConnectTimeout(timeout)
                        .withReadTimeout(timeout)))
                .build();
    }

    public NewsApiResponse topHeadlines(CountryCode country, NewsCategory category, String query, int page, int pageSize) {
        return get("/v2/top-headlines", uriBuilder -> {
            UriBuilder builder = uriBuilder
                    .queryParam("country", country.apiCode())
                    .queryParam("page", page)
                    .queryParam("pageSize", pageSize)
                    .queryParam("apiKey", config.apiKey());

            if (category != null) {
                builder.queryParam("category", category.apiValue());
            }
            if (query != null && !query.isBlank()) {
                builder.queryParam("q", query.trim());
            }
            return builder.build();
        });
    }

    public NewsApiResponse topHeadlinesBySources(List<String> sourceIds, int page, int pageSize) {
        return get("/v2/top-headlines", uriBuilder -> uriBuilder
                .queryParam("sources", String.join(",", sourceIds))
                .queryParam("page", page)
                .queryParam("pageSize", pageSize)
                .queryParam("apiKey", config.apiKey())
                .build());
    }

    public NewsApiResponse everything(String query, int page, int pageSize) {
        String newsQuery = query == null || query.isBlank() ? "world" : query.trim();
        return get("/v2/everything", uriBuilder -> uriBuilder
                .queryParam("q", newsQuery)
                .queryParam("page", page)
                .queryParam("pageSize", pageSize)
                .queryParam("apiKey", config.apiKey())
                .build());
    }

    public NewsApiResponse everythingBySources(String query, List<String> sourceIds, int page, int pageSize) {
        String newsQuery = query == null || query.isBlank() ? "world" : query.trim();
        return get("/v2/everything", uriBuilder -> uriBuilder
                .queryParam("q", newsQuery)
                .queryParam("sources", String.join(",", sourceIds))
                .queryParam("language", "en")
                .queryParam("sortBy", "publishedAt")
                .queryParam("page", page)
                .queryParam("pageSize", pageSize)
                .queryParam("apiKey", config.apiKey())
                .build());
    }

    public NewsApiSourcesResponse sources(CountryCode country) {
        return getSources("/v2/top-headlines/sources", uriBuilder -> uriBuilder
                .queryParam("country", country.apiCode())
                .queryParam("apiKey", config.apiKey())
                .build());
    }

    private NewsApiResponse get(String path, java.util.function.Function<UriBuilder, java.net.URI> uriFunction) {
        return get(path, uriFunction, NewsApiResponse.class);
    }

    private NewsApiSourcesResponse getSources(
            String path,
            java.util.function.Function<UriBuilder, java.net.URI> uriFunction
    ) {
        return get(path, uriFunction, NewsApiSourcesResponse.class);
    }

    private <T> T get(
            String path,
            java.util.function.Function<UriBuilder, java.net.URI> uriFunction,
            Class<T> responseType
    ) {
        if (config.apiKey() == null || config.apiKey().isBlank()) {
            throw new NewsApiException(HttpStatus.INTERNAL_SERVER_ERROR, "NEWS_API_KEY is required");
        }

        try {
            T response = restClient.get()
                    .uri(uriBuilder -> uriFunction.apply(uriBuilder.path(path)))
                    .retrieve()
                    .body(responseType);

            if (response == null) {
                throw new NewsApiException(HttpStatus.BAD_GATEWAY, "NewsAPI returned an empty response");
            }
            validateStatus(response);
            return response;
        } catch (RestClientResponseException ex) {
            HttpStatus status = ex.getStatusCode().is4xxClientError()
                    ? HttpStatus.BAD_GATEWAY
                    : HttpStatus.SERVICE_UNAVAILABLE;
            throw new NewsApiException(status, "NewsAPI error: " + detailedError(ex));
        } catch (NewsApiException ex) {
            throw ex;
        } catch (RuntimeException ex) {
            throw new NewsApiException(HttpStatus.SERVICE_UNAVAILABLE, "Unable to reach NewsAPI");
        }
    }

    private void validateStatus(Object response) {
        String status = null;
        String message = null;
        if (response instanceof NewsApiResponse apiResponse) {
            status = apiResponse.status();
            message = apiResponse.message();
        } else if (response instanceof NewsApiSourcesResponse sourcesResponse) {
            status = sourcesResponse.status();
            message = sourcesResponse.message();
        }

        if (!"ok".equalsIgnoreCase(status)) {
            throw new NewsApiException(HttpStatus.BAD_GATEWAY,
                    message == null ? "NewsAPI request failed" : message);
        }
    }

    private String detailedError(RestClientResponseException ex) {
        String responseBody = ex.getResponseBodyAsString();
        if (responseBody == null || responseBody.isBlank()) {
            return ex.getStatusText();
        }

        try {
            JsonNode body = objectMapper.readTree(responseBody);
            String code = body.path("code").asText("");
            String message = body.path("message").asText("");
            if (!code.isBlank() && !message.isBlank()) {
                return code + " - " + message;
            }
            if (!message.isBlank()) {
                return message;
            }
        } catch (Exception ignored) {
            return ex.getStatusText();
        }

        return ex.getStatusText();
    }
}
