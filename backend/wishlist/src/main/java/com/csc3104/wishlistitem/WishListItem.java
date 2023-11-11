package com.csc3104.wishlistitem;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "wishlist")
public class WishListItem {
    @Id
    private String id;
    private String name;
    private String businessId;
    private String albumId;
    private String remarks;
    private boolean visited;

    public WishListItem(String name, String businessId, String albumId, String remarks, boolean visited) {
        this.name = name;
        this.businessId = businessId;
        this.albumId = albumId;
        this.remarks = remarks;
        this.visited = visited;
    }

}