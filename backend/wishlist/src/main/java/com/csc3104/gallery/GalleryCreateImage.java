package com.csc3104.gallery;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class GalleryCreateImage extends Gallery {
    private byte[] image;

    public GalleryCreateImage(String title, byte[] image) {
        super(title);
        this.image = image;
    }

    public GalleryCreateImage(String id, String title, byte[] image) {
        super(id, title);
        this.image = image;
    }
}
