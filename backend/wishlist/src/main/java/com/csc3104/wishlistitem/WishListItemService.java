package com.csc3104.wishlistitem;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // String id = UUID.randomUUID().toString();
        WishListItem wishlistItem = wishlistitemRepository.insert(new WishListItem(name, businessId, albumId, remarks, visited));
    
        return wishlistItem;    
    }


    public List<WishListItem> allItemsByAlbumId(String albumId) {
        return wishlistitemRepository.findAllByAlbumId(albumId);
    }
    
    // public void deleteWishListItemByBusinessId(String businessId) {
    //     WishListItem wishlistItem = wishlistitemRepository.findByBusinessId(businessId);
    //     if (wishlistItem != null) {
    //         wishlistitemRepository.delete(wishlistItem);
    //     } else {
    //         throw new NoSuchElementException("Wish list item not found for the given businessId");
    //     }
    // }

    public void deleteWishListItemByObjectId(String objectId) {
        WishListItem wishlistItem = wishlistitemRepository.findById(objectId);
        if (wishlistItem != null) {
            wishlistitemRepository.delete(wishlistItem);
        } else {
            throw new NoSuchElementException("Wish list item not found for the given objectId");
        }
    }
}
