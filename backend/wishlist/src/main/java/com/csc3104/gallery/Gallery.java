package com.csc3104.gallery;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "gallery")
public class Gallery {
    @Id
    private String id;
    // private String email;
    private String title;

    public Gallery(String id, String title) {
        // this.email = email;
        this.id = id;
        this.title = title;
    }

    // public Gallery(String email, String title) {
    public Gallery(String title) {
        // this.email = email;
        this.title = title;
    }
}
