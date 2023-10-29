package com.csc3104.gallery;

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
    private ObjectId imageId;

    public Gallery(String title, ObjectId imageId) {
        this.title = title;
        this.image = imageId;
    }
}
