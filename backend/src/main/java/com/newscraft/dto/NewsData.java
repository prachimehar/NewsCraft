package com.newscraft.dto;

import java.util.List;

public record NewsData(
        int totalResults,
        List<NewsArticleResponse> articles
) {
}
