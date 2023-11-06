package com.csc3104.wishlistitem;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "wishlist")
public class WishListItem {
    @Id
<<<<<<< HEAD
    private ObjectId id;
=======
    private String id;
>>>>>>> main
    private String name;
    private String businessId;
    private String albumId;
    private String remarks;
    private boolean visited;

<<<<<<< HEAD

    public WishListItem(String name, String businessId, String albumId, String remarks, boolean visited) {
        this.id = new ObjectId();
=======
    public WishListItem(String name, String businessId, String albumId, String remarks, boolean visited) {
        this.id = new ObjectId().toString();
>>>>>>> main
        this.name = name;
        this.businessId = businessId;
        this.albumId = albumId;
        this.remarks = remarks;
        this.visited = visited;
    }
<<<<<<< HEAD
=======

>>>>>>> main
}
