package com.newscraft.exception;

import org.springframework.http.HttpStatus;

public class NewsApiException extends RuntimeException {
    private final HttpStatus status;

    public NewsApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus status() {
        return status;
    }
}
