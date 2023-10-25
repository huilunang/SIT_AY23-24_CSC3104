package com.csc3104.backend;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "gallery")
public class Gallery {
    @Id
    private ObjectId id;
    private String title;

    public Gallery(String title) {
        this.title = title;
    }
}
