package com.csc3104;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	// @Bean
	// public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
	// return builder.routes()
	// .route("account", r -> r.path("/api/v1/auth/*", "/api/v1/user/*")
	// .uri("http://account:8081"))
	// .route("wishlist", r -> r.path("/api/v1/gallery/*", "/api/v1/poi/*",
	// "/api/v1/wishlist/*")
	// .uri("http://wishlist:8082"))
	// .route("notification", r -> r.path("/events/*", "/notification/*")
	// .uri("http://notification:8083"))
	// .route("friends", r -> r.path("/friends/*")
	// .uri("http://friends:8084"))
	// .build();
	// }

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("*")
						.allowedOrigins("*");
			}
		};
	}
}
