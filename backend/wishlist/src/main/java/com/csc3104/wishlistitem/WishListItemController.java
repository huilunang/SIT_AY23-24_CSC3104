package com.csc3104.wishlistitem;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishListItemController {
    @Autowired
    private WishListItemService wishlistitemService;

    @GetMapping
    public ResponseEntity<List<WishListItem>> getAllWishListItem() {
        return new ResponseEntity<List<WishListItem>>(wishlistitemService.allWishListItem(), HttpStatus.OK);
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<List<WishListItem>> getAllWishListItemByAlbumId(@PathVariable String albumId) {
        return new ResponseEntity<>(wishlistitemService.allItemsByAlbumId(albumId), HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<WishListItem> createWishListItem(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String businessId = payload.get("businessId");
        String albumId = payload.get("albumId");
        String remarks = payload.get("remarks");
        boolean visited = Boolean.parseBoolean(payload.get("visited"));
        WishListItem newWishListItem = wishlistitemService.createWishListItem(name, businessId, albumId, remarks,
                visited);

        return new ResponseEntity<>(newWishListItem, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{businessId}")
    public ResponseEntity<String> deleteWishListItemByBusinessId(@PathVariable String businessId) {
        try {
            wishlistitemService.deleteWishListItemByBusinessId(businessId);
            return new ResponseEntity<>("Wish list item deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
