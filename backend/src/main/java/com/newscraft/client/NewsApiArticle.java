package com.newscraft.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public record NewsApiArticle(
        NewsApiSource source,
        String author,
        String title,
        String description,
        String url,
        @JsonProperty("urlToImage") String urlToImage,
        OffsetDateTime publishedAt,
        String content
) {
}
