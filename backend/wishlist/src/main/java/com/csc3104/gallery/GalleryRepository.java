package com.csc3104.gallery;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends MongoRepository<GalleryCreateAlbum, String> {
    @Query(value = "{ 'email' : ?0 }")
    List<GalleryCreateAlbum> findAllByUserId(String email);
}
