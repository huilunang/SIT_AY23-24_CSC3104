package com.csc3104.gallery;

import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class GalleryCreateImage extends Gallery {
    private byte[] image;

    public GalleryCreateImage(String title, byte[] image) {
        super(title);
        this.image = image;
    }
}
