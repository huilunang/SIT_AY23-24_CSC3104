package com.csc3104.gallery;

import java.io.IOException;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<GalleryCreateImage> getOneGallery(@PathVariable ObjectId id) {
        return new ResponseEntity<GalleryCreateImage>(galleryService.oneGallery(id),
                HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<GalleryCreateAlbum> createGallery(@RequestParam("title") String title,
            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        return new ResponseEntity<GalleryCreateAlbum>(galleryService.addGallery(title, imageFile), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGallery(@PathVariable ObjectId id) {
        return new ResponseEntity<String>(galleryService.deleteGallery(id), HttpStatus.OK);
    }
}
