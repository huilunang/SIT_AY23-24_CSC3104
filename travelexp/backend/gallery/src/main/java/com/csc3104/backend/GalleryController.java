package com.csc3104.backend;

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

@RestController
@RequestMapping("/api/v1/gallery")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        return new ResponseEntity<List<Gallery>>(galleryService.allGallery(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gallery>> getOneGallery(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Gallery>>(galleryService.oneGallery(id), HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<Gallery> createGallery(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Gallery>(galleryService.createGallery(payload.get("title")), HttpStatus.CREATED);
    }
}
