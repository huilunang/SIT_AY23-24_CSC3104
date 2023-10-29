package com.csc3104.wishlistitem;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "wishlist")
public class WishListItem {
    @Id
    private ObjectId id;
    private String name;
    private String albumId;

    public WishListItem(String name, String albumId) {
        this.id = new ObjectId();
        this.name = name;
        this.albumId = albumId;
    }
}
