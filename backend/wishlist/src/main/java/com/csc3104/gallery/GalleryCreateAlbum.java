package com.csc3104.gallery;

import org.bson.types.ObjectId;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class GalleryCreateAlbum extends Gallery {
    private ObjectId imageId;

    public GalleryCreateAlbum(String title, ObjectId imageId) {
        super(title);
        this.imageId = imageId;
    }
}
