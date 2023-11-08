package com.csc3104.gallery;

import org.bson.types.ObjectId;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class GalleryCreateAlbum extends Gallery {
    private String email;
    private ObjectId imageId;

    public GalleryCreateAlbum(String title, String email, ObjectId imageId) {
        super(title);
        this.email = email;
        this.imageId = imageId;
    }
}
