package com.csc3104.poi;

import lombok.Data;

@Data
public class POI {
    private String name;
    private String category;
    private String address; 
    private String imageUrl;
    private String rating;
    private String remarks;
    private boolean visited; 
}