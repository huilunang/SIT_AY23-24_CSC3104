package com.csc3104.gallery;

import java.util.List;
import java.util.Optional;

import com.mongodb.DBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// business logic
@Service
public class GalleryService {
    @Autowired
    private GridFsTemplate gridFsTemplate;
    @Autowired
    private GridFsOperations operations;
    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> allGallery() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> oneGallery(ObjectId id) {
        return galleryRepository.findById(id);
    }

    public Gallery addGallery(String title, MultipartFile image) {
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", image.getSize());
        ObjectId id = gridFsTemplate.store(image.getInputStream(), image.getName(), image.getContentType(), metadata);

        Gallery gallery = galleryRepository.insert(new Gallery(title, image));

        return gallery;
    }
}
