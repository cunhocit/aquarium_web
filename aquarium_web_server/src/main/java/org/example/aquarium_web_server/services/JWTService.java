package org.example.aquarium_web_server.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String generateTokenAdmin(Admin admin) {
        Date now = new Date();

        Date expiration = new Date(now.getTime() + 60 * 60 * 1000);
        return Jwts.builder()
                .setSubject(admin.getEmail())
                .claim("name", admin.getName())
                .claim("role", "ADMIN")
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateTokenCustomer(Customer customer) {
        Date now = new Date();

        Date expiration = new Date(now.getTime() + 60 * 60 * 1000);
        return Jwts.builder()
                .setSubject(customer.getEmail())
                .claim("name", customer.getName())
                .claim("role", "CUSTOMER")
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, Admin admin) {
        final String email = extractEmail(token);
        return (email.equals(admin.getEmail())) && !isTokenExpired(token);
    }

    public boolean isTokenValid2(String token, Customer customer) {
        final String email = extractEmail(token);
        return (email.equals(customer.getEmail())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}