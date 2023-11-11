package com.csc3104.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Check if jwt present or not
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            // just continue rest filter
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        // IF email is present AND first time jwt get authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Get UserDetails
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // IF jwt is valid
            if (jwtService.isTokenValid(jwt, userDetails)) {

                // Create auth token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // Add additional details but what are these details
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Update securityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            // Call filterChain (next handler)
            filterChain.doFilter(request, response);
        }
    }
}
