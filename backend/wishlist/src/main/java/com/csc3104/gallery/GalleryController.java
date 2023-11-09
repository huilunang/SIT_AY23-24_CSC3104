package com.csc3104.gallery;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/gallery")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @GetMapping("testing")
    public String testing() {
        return "Controller's working..";
    }

    @GetMapping("/testing")
    public String testingController() {
        return "It works";
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<GalleryCreateImage>> getAllGallery(@PathVariable String email) {
        return new ResponseEntity<List<GalleryCreateImage>>(galleryService.allGallery(email), HttpStatus.OK);
    }

    @GetMapping("/album/{id}")
    public ResponseEntity<GalleryCreateImage> getOneGallery(@PathVariable String id) {
        return new ResponseEntity<GalleryCreateImage>(galleryService.oneGallery(id),
                HttpStatus.OK);
    }

    @PostMapping("/album/create")
    public ResponseEntity<GalleryCreateAlbum> createGallery(@RequestParam("title") String title,
            @RequestParam("email") String email,
            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        return new ResponseEntity<GalleryCreateAlbum>(galleryService.addGallery(title, email, imageFile),
                HttpStatus.CREATED);
    }

    @PutMapping("/album/{id}")
    public ResponseEntity<String> updateGallery(@PathVariable String id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        return new ResponseEntity<String>(galleryService.updateGallery(id, title, imageFile), HttpStatus.OK);
    }

    @DeleteMapping("/album/{id}")
    public ResponseEntity<String> deleteGallery(@PathVariable String id) {
        return new ResponseEntity<String>(galleryService.deleteGallery(id), HttpStatus.OK);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleFileUploadError() {
        return new ResponseEntity<String>("File upload cannot exceed the size of 100MB", HttpStatus.PAYLOAD_TOO_LARGE);
    }
}
