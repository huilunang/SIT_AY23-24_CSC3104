package com.csc3104.gallery;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// business logic
@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> allGallery() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> oneGallery(ObjectId id) {
        return galleryRepository.findById(id);
    }

    public Gallery createGallery(String title) {
        Gallery gallery = galleryRepository.insert(new Gallery(title));

        return gallery;
    }
}
