package com.csc3104.notifications;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NotificationApplication implements CommandLineRunner {

	public static void main(String[] args) {
		System.setProperty("server.port", "8082");

		System.setProperty("spring.data.mongodb.database", "travelexp");
		System.setProperty("spring.data.mongodb.host", "localhost");
		System.setProperty("spring.data.mongodb.port", "27017");
		System.setProperty("spring.data.mongodb.username", "csc3104");
		System.setProperty("spring.data.mongodb.password", "csc3104");

		System.setProperty("spring.mail.host", "smtp.gmail.com");
		System.setProperty("spring.mail.port", "587");
		System.setProperty("spring.mail.username", "w08277427@gmail.com");
		System.setProperty("spring.mail.password", "inqq zlpy tmji drol");
		System.setProperty("spring.mail.properties.mail.smtp.auth", "true");
		System.setProperty("spring.mail.properties.mail.smtp.starttls.enable", "true");

		SpringApplication.run(NotificationApplication.class, args);
	}
	
    @Override
    public void run(String... args) throws Exception {
    }  

  @Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("*")
						.allowedOrigins("http://localhost:5173");
			}
		};
	}
}
