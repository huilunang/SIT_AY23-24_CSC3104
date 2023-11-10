package com.csc3104;

import net.devh.boot.grpc.server.security.authentication.GrpcAuthenticationReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcServerConfig {

    @Bean
    public GrpcAuthenticationReader grpcAuthenticationReader() {
        // You may need to configure the authentication reader based on your requirements
        return (metadata, request) -> {
            // Your authentication logic goes here
            // You might check metadata or request to authenticate
            // Return null if authentication fails, otherwise return authentication details
            return null;
        };
    }
}
