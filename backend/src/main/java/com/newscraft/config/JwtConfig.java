package com.newscraft.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "newscraft.jwt")
public record JwtConfig(String secret, long expiration) {
}
