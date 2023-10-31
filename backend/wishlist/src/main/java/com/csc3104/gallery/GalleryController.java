package com.csc3104.gallery;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/gallery")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<GalleryCreateImage>> getAllGallery() {
        return new ResponseEntity<List<GalleryCreateImage>>(galleryService.allGallery(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gallery>> getOneGallery(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Gallery>>(galleryService.oneGallery(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<GalleryCreateAlbum> createGallery(@RequestBody GalleryCreateImage gallery) {
        MultipartFile mFIle = gallery.getImage();
        return new ResponseEntity<GalleryCreateAlbum>(galleryService.addGallery(gallery.getTitle(), mFIle), HttpStatus.CREATED);
    }
}
