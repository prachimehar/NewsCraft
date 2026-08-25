package com.newscraft;

import com.newscraft.config.NewsApiConfig;
import com.newscraft.config.JwtConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableConfigurationProperties({NewsApiConfig.class, JwtConfig.class})
public class NewsCraftApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewsCraftApplication.class, args);
    }
}
