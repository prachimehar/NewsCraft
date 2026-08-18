package com.newscraft.controller;

import com.newscraft.dto.NewsResponse;
import com.newscraft.service.NewsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class NewsController {
    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/api/news")
    public NewsResponse getNews(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false, name = "query") String query,
            @RequestParam(required = false, name = "q") String q
    ) {
        return newsService.getNews(country, category, page, pageSize, query == null ? q : query);
    }

    @GetMapping("/all-news")
    public NewsResponse allNews(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false, defaultValue = "world") String q
    ) {
        return newsService.getNews(null, null, page, pageSize, q);
    }

    @GetMapping("/top-headlines")
    public NewsResponse topHeadlines(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize
    ) {
        return newsService.getNews(country, category, page, pageSize, null);
    }

    @GetMapping("/country/{iso}")
    public NewsResponse countryNews(
            @PathVariable String iso,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize
    ) {
        return newsService.getNews(iso, category, page, pageSize, null);
    }
}
