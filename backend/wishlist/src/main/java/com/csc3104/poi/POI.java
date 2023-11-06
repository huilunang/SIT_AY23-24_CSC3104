package com.csc3104.poi;

// import lombok.Builder;
import lombok.Data;
import net.minidev.json.JSONArray;

@Data
public class POI {
    private String name;
    private String category;
    private String address; 
    private String imageUrl;
    private String rating;
    private String remarks;
}
