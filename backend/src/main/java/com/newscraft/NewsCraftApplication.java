package com.newscraft;

import com.newscraft.config.NewsApiConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(NewsApiConfig.class)
public class NewsCraftApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewsCraftApplication.class, args);
    }
}
