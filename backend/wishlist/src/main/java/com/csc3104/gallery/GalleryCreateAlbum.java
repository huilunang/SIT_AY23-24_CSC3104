package com.csc3104.gallery;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class GalleryCreateAlbum extends Gallery {
    private ObjectId imageId;

    public GalleryCreateAlbum(String title, ObjectId imageId) {
        super(title);
        this.imageId = imageId;
    }
}
