package com.spring_learn.distributed_lovable_clone.common_lib.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;

@Component
public class AuthUtil {

    @Value("${jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${jwt.expiration-ms:3600000}")
    private long accessTokenExpirationMs;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private long refreshTokenExpirationMs;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(JwtUserPrincipal user) {
        return buildToken(user, accessTokenExpirationMs, "access");
    }

    public String generateRefreshToken(JwtUserPrincipal user) {
        return buildToken(user, refreshTokenExpirationMs, "refresh");
    }

    private String buildToken(JwtUserPrincipal user, long expirationMs, String type) {
        return Jwts.builder()
                .subject(user.username())
                .claim("userId", user.userId().toString())
                .claim("name", user.name())
                .claim("type", type)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSecretKey())
                .compact();
    }

    public JwtUserPrincipal verifyAccessToken(String token) {
        return verifyToken(token, "access");
    }

    public JwtUserPrincipal verifyRefreshToken(String token) {
        return verifyToken(token, "refresh");
    }

    private JwtUserPrincipal verifyToken(String token, String expectedType) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String type = claims.get("type", String.class);
        if (!expectedType.equals(type)) {
            throw new JwtException("Expected a " + expectedType + " token but got: " + type);
        }

        Long userId = Long.parseLong(claims.get("userId", String.class));
        String name = claims.get("name", String.class);
        String username = claims.getSubject();

        return new JwtUserPrincipal(userId, name, username, null, new ArrayList<>());
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof JwtUserPrincipal userPrincipal)) {
            throw new AuthenticationCredentialsNotFoundException("No JWT Found");
        }
        return userPrincipal.userId();
    }
}
