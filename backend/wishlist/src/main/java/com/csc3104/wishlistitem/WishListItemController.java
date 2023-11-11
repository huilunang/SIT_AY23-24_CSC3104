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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishListItemController {
    @Autowired
    private WishListItemService wishlistitemService;

    @GetMapping("/all")
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

    @PostMapping("/userCategories/insert")
    public ResponseEntity<UserCategories> createUserCategory(@RequestBody Map<String, Object> payload) {
        System.out.println("Attempting to create user categories in Controllers...");
        String email = (String) payload.get("email");
        System.out.println("Email: " + email);

        List<String> userCategories = (List<String>) payload.get("userCategories");
        System.out.println("User Categories: " + userCategories);
        UserCategories newUserCategories = wishlistitemService.createUserCategories(email, userCategories);
        return new ResponseEntity<>(newUserCategories, HttpStatus.CREATED);
    }

    @PutMapping("/userCategories/update")
    public ResponseEntity<UserCategories> updateUserCategories(@RequestBody Map<String, Object> payload) {
        System.out.println("Attempting to update user categories...");
        String email = (String) payload.get("email");
        System.out.println("Email: " + email);
        List<String> categories = (List<String>) payload.get("categories");
        System.out.println("Updated Categories: " + categories);
        UserCategories updatedUserCategories = wishlistitemService.updateUserCategories(email, categories);
        return new ResponseEntity<>(updatedUserCategories, HttpStatus.OK);
    }

    @GetMapping("/getCategories/{email}")
    public ResponseEntity<UserCategories> getUserCategoriesByEmail(@PathVariable String email) {
        System.out.println("Attempting to fetch user categories...");
        System.out.println("Email: " + email);
        return new ResponseEntity<>(wishlistitemService.getUserCategoriesByEmail(email), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{objectId}")
    public ResponseEntity<String> deleteWishListItemByObjectId(@PathVariable String objectId) {
        try {
            System.out.println("Attempting to delete object ID: " + objectId);
            wishlistitemService.deleteWishListItemByObjectId(objectId);
            return new ResponseEntity<>("Wish list item deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
