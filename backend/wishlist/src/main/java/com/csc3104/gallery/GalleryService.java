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
            byte[] imageData = loadImageFromGridFS(album.getImageId());

            // Attach the image data to the album
            GalleryCreateImage image = new GalleryCreateImage(album.getId(), album.getTitle(), imageData);
            images.add(image);
        }

        return images;
    }

    public GalleryCreateImage oneGallery(String id) {
        Optional<GalleryCreateAlbum> albumOpt = galleryRepository.findById(id);

        if (albumOpt.isPresent()) {
            GalleryCreateAlbum album = albumOpt.get();
            byte[] imageData = loadImageFromGridFS(album.getImageId());
            GalleryCreateImage image = new GalleryCreateImage(album.getId(), album.getTitle(), imageData);

            return image;
        }

        return null;
    }

    public GalleryCreateAlbum addGallery(String title, MultipartFile image) throws IOException {
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", image.getSize());
        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(),
                image.getContentType(),
                metadata);

        GalleryCreateAlbum album = galleryRepository.insert(new GalleryCreateAlbum(title, imageId));

        return album;
    }

    public String updateGallery(String id, String title, MultipartFile image) throws IOException {
        if (galleryRepository.existsById(id)) {
            Optional<GalleryCreateAlbum> albumOpt = galleryRepository.findById(id);

            if (albumOpt.isPresent()) {
                GalleryCreateAlbum album = albumOpt.get();

                if (title != null || image != null) {
                    if (title != null) {
                        album.setTitle(title);
                    }

                    if (image != null) {
                        gridFsTemplate.delete(new Query(Criteria.where("_id").is(album.getImageId())));

                        DBObject metadata = new BasicDBObject();
                        metadata.put("fileSize", image.getSize());
                        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(),
                                image.getContentType(),
                                metadata);

                        album.setImageId(imageId);
                    }

                    galleryRepository.save(album);
                }
            }
            return "Successful";
        } else {
            return "Unsuccessful: Id `" + id + "` is not found";
        }
    }

    public String deleteGallery(String id) {
        if (galleryRepository.existsById(id)) {
            Optional<GalleryCreateAlbum> albumOpt = galleryRepository.findById(id);

            if (albumOpt.isPresent()) {
                GalleryCreateAlbum album = albumOpt.get();
                gridFsTemplate.delete(new Query(Criteria.where("_id").is(album.getImageId())));
                galleryRepository.deleteById(id);
            }
            return "Successful";
        } else {
            return "Unsuccessful: Id `" + id + "` is not found";
        }
    }

    private byte[] loadImageFromGridFS(ObjectId imageId) {
        GridFSFile imageFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(imageId)));

        if (imageFile != null) {
            try {
                return IOUtils.toByteArray(operations.getResource(imageFile).getInputStream());
            } catch (IOException e) {
                return null;
            }
        }

        return null;
    }
}
