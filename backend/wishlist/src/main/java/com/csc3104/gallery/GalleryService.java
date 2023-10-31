package com.csc3104.gallery;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mongodb.BasicDBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.DBObject;
import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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

    public List<GalleryCreateImage> allGallery() {
        List<GalleryCreateAlbum> albums = galleryRepository.findAll();
        List<GalleryCreateImage> images = new ArrayList<>();

        for (GalleryCreateAlbum album : albums) {
            ObjectId imageId = album.getImageId();
            byte[] imageData = loadImageFromGridFS(imageId);

            // Attach the image data to the album
            GalleryCreateImage image = new GalleryCreateImage();
            image.setTitle(album.getTitle());
            image.setImage(imageData);
            images.add(image);
        }
        
        return images;
    }

    public Optional<Gallery> oneGallery(ObjectId id) {
        return galleryRepository.findById(id);
    }

    public GalleryCreateAlbum addGallery(String title, MultipartFile image) {
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", image.getSize());
        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getName(), image.getContentType(), metadata);

        GalleryCreateAlbum album = galleryRepository.insert(new GalleryCreateAlbum(title, imageId));

        return album;
    }

    private byte[] loadImageFromGridFS(ObjectId imageId) {
        GridFSFile imageFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(imageId)));

        if (imageFile != null) {
            try {
                byte[] file = IOUtils.toByteArray(operations.getResource(imageFile).getInputStream());
    
                // Read the image data into a byte array
                // ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                // int bytesRead;
                // byte[] buffer = new byte[1024];
                // while ((bytesRead = imageStream.read(buffer)) != -1) {
                //     outputStream.write(buffer, 0, bytesRead);
                // }
    
                // return outputStream.toByteArray();
                return file;
            } catch (IOException e) {
                // Handle the exception
                return null;
            }
        }
    
        return null;
    }
}
