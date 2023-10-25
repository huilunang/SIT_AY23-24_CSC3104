package com.cloud.backend.restaurants;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class Restaurant {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private final String name;
    private final boolean visited;
    private final String email;

    private LocalDate targetDate;
}
