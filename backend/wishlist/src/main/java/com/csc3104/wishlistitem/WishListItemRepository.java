package com.csc3104.wishlistitem;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListItemRepository extends MongoRepository<WishListItem, ObjectId> {
    @Query("{ 'albumId' : ?0 }")
    List<WishListItem> findAllByAlbumId(String albumId);

    // WishListItem findByBusinessId(String businessId);

    WishListItem findByIdAndBusinessId(String id, String businessId);
    WishListItem findById(String objectId);
}
