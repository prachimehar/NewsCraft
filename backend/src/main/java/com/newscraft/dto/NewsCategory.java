package com.newscraft.dto;

import java.util.Arrays;

public enum NewsCategory {
    GENERAL("general", "General"),
    BUSINESS("business", "Business"),
    ENTERTAINMENT("entertainment", "Entertainment"),
    HEALTH("health", "Health"),
    SCIENCE("science", "Science"),
    SPORTS("sports", "Sports"),
    TECHNOLOGY("technology", "Technology");

    private final String apiValue;
    private final String displayName;

    NewsCategory(String apiValue, String displayName) {
        this.apiValue = apiValue;
        this.displayName = displayName;
    }

    public String apiValue() {
        return apiValue;
    }

    public String displayName() {
        return displayName;
    }

    public static NewsCategory from(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return Arrays.stream(values())
                .filter(category -> category.apiValue.equalsIgnoreCase(value) || category.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported category: " + value));
    }
}
