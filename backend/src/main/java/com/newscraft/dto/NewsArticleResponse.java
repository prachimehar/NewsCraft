package com.newscraft.dto;

import java.time.OffsetDateTime;

public record NewsArticleResponse(
        String title,
        String description,
        String content,
        String url,
        String imageUrl,
        String sourceName,
        String sourceId,
        String author,
        String country,
        String countryCode,
        String category,
        OffsetDateTime publishedAt
) {
}
