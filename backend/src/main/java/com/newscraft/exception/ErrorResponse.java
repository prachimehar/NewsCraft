package com.newscraft.exception;

public record ErrorResponse(
        int status,
        String message
) {
}
