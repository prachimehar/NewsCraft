package com.newscraft.service;

import com.newscraft.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final JwtConfig config;

    public JwtService(JwtConfig config) {
        this.config = config;
    }

    public String generateToken(String email, String role) {
        Date issuedAt = new Date();
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(issuedAt)
                .expiration(new Date(issuedAt.getTime() + config.expiration()))
                .signWith(signingKey())
                .compact();
    }

    public String extractEmail(String token) {
        return parse(token).getSubject();
    }

    public boolean isValid(String token, String email) {
        Claims claims = parse(token);
        return email.equalsIgnoreCase(claims.getSubject()) && claims.getExpiration().after(new Date());
    }

    public String parseRole(String token) {
        return parse(token).get("role", String.class);
    }

    private Claims parse(String token) {
        return Jwts.parser().verifyWith(signingKey()).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey signingKey() {
        String secret = config.secret();
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters");
        }
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
