package com.votaloya.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                        HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        String jsonResponse = String.format(
            "{\"error\": \"Token inválido, no tiene acceso\", " +
            "\"mensaje\": \"Debe utilizar el rol requerido para acceder a este recurso\", " +
            "\"path\": \"%s\", " +
            "\"timestamp\": \"%s\", " +
            "\"status\": %d}",
            request.getRequestURI(),
            timestamp,
            HttpServletResponse.SC_UNAUTHORIZED
        );

        response.getWriter().write(jsonResponse);
    }
}

