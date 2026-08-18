package com.newscraft.dto;

public record NewsResponse(
        int status,
        boolean success,
        String message,
        NewsData data
) {
    public static NewsResponse ok(NewsData data) {
        return new NewsResponse(200, true, "Successfully fetched the data", data);
    }
}
