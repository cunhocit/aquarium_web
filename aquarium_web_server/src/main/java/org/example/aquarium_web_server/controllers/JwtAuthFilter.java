package org.example.aquarium_web_server.controllers;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.repositories.AdminRepository;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JWTService jwtService;

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Bỏ qua các endpoint không yêu cầu xác thực
        if (request.getServletPath().contains("/api/admin_login") ||
                request.getServletPath().contains("/api/admin_register") ||
                request.getServletPath().contains("/api/verify_email_token") ||
                request.getServletPath().contains("/api/password_reset")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Kiểm tra header Authorization
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractEmail(jwt);

        if (userEmail != null) {
            Admin admin = adminRepository.findByEmail(userEmail);
            if (admin != null && jwtService.isTokenValid(jwt, admin)) {
                // Nếu là Admin, thiết lập SecurityContext
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                admin,
                                null,
                                Collections.emptyList() // Có thể thay đổi thành quyền của Admin
                        )
                );
            } else {
                Customer customer = customerRepository.findByEmail(userEmail);
                if (customer != null && jwtService.isTokenValid2(jwt, customer)) {
                    // Nếu là Customer, thiết lập SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(
                            new UsernamePasswordAuthenticationToken(
                                    customer,
                                    null,
                                    Collections.emptyList() // Có thể thay đổi thành quyền của Customer
                            )
                    );
                }
            }
        }

        filterChain.doFilter(request, response);
    }

}