package com.csc3104.wishlistitem;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
// business logic
@Service
public class WishListItemService {
    @Autowired
    private WishListItemRepository wishlistitemRepository;

    public List<WishListItem> allWishListItem() {
        return wishlistitemRepository.findAll();
    }

    public Optional<WishListItem> oneWishListItem(ObjectId id) {
        return wishlistitemRepository.findById(id);
    }

    public WishListItem createWishListItem(String name, String businessId, String albumId, String remarks, boolean visited) {
        WishListItem wishlistItem = wishlistitemRepository.insert(new WishListItem(name, businessId, albumId, remarks, visited));
    
        return wishlistItem;
    }


    public List<WishListItem> allItemsByAlbumId(String albumId) {
        return wishlistitemRepository.findAllByAlbumId(albumId);
    }
    
    

    // public List<WishListItem> allWishListItemById(String albumId) {
    //     // Assuming your repository is wishlistitemRepository
    //     List<WishListItem> allItems = wishlistitemRepository.findAll();
    //     List<WishListItem> filteredItems = new ArrayList<>();
    //     for (WishListItem item : allItems) {
    //         if (item.getAlbumId().equals(albumId)) {
    //             filteredItems.add(item);
    //         }
    //     }
    //     return filteredItems;
    // }
    
    // public ResponseEntity<List<WishListItem>> getAllWishListItemById(String albumId) {
    //     List<WishListItem> filteredList = wishListItemService.allWishListItemByAlbumId(albumId);
    //     return new ResponseEntity<List<WishListItem>>(filteredList, HttpStatus.OK);
    // }
    
}
