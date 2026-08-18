package com.newscraft.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "newscraft.news-api")
public record NewsApiConfig(
        String apiKey,
        String baseUrl,
        Duration timeout
) {
}
