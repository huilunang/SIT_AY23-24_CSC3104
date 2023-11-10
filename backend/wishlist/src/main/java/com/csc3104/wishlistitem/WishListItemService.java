package com.csc3104.wishlistitem;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// business logic
@Service
public class WishListItemService {
    @Autowired
    private WishListItemRepository wishlistitemRepository;
    @Autowired
    private UserCategoriesRepository userCategoriesRepository;

    public List<WishListItem> allWishListItem() {
        return wishlistitemRepository.findAll();
    }

    public WishListItem oneWishListItem(ObjectId id) {
        Optional<WishListItem> wishlistitemopt = wishlistitemRepository.findById(id);
        if (wishlistitemopt.isPresent()) {
            WishListItem item = wishlistitemopt.get();

            return item;
        }
        return null;
    }

    public WishListItem createWishListItem(String name, String businessId, String albumId, String remarks,
            boolean visited) {
        WishListItem wishlistItem = wishlistitemRepository
                .insert(new WishListItem(name, businessId, albumId, remarks, visited));

        return wishlistItem;
    }

    public UserCategories createUserCategories(String email, List<String> categories) {
        
        System.out.println("Attempting to create user categories in Service...");
        System.out.println("Email: "+ email);
        System.out.println("User Categories: "+ categories);
        UserCategories userCategories = userCategoriesRepository
                .insert(new UserCategories(email, categories));
        return userCategories;
    }

    public UserCategories updateUserCategories(String email, List<String> updatedCategories) {
        UserCategories userCategories = userCategoriesRepository.findByEmail(email);
        userCategories.setCategories(updatedCategories);
        userCategoriesRepository.save(userCategories);
        return userCategories;
      }

    public UserCategories getUserCategoriesByEmail(String email){
        System.out.println("Attempting to fetch user categories in Service...");
        System.out.println("Email: "+ email);
        UserCategories userCategories = userCategoriesRepository
                .findByEmail(email);
        System.out.println("User Category retrieved, details: "+ userCategories);
        return userCategories;
    }

    public List<WishListItem> allItemsByAlbumId(String albumId) {
        return wishlistitemRepository.findAllByAlbumId(albumId);
    }

    public void deleteWishListItemByObjectId(String objectId) {
        WishListItem wishlistItem = wishlistitemRepository.findById(objectId);
        if (wishlistItem != null) {
            wishlistitemRepository.delete(wishlistItem);
        } else {
            throw new NoSuchElementException("Wish list item not found for the given objectId");
        }
    }

    public WishListItem updateWishListItem(WishListItem wishListItem) {
        return wishlistitemRepository.save(wishListItem);
    }

    public void updateWishListItemRemarks(String wishlistId, String businessId, String remarks) {
        WishListItem wishListItem = wishlistitemRepository.findByIdAndBusinessId(wishlistId, businessId);

        if (wishListItem != null) {
            wishListItem.setRemarks(remarks);
            updateWishListItem(wishListItem);
        } else {
            throw new NoSuchElementException("Wish list item not found for the given IDs");
        }
    }

    public void updateWishListItemVisited(String wishlistId, String businessId, boolean visited) {
        WishListItem wishListItem = wishlistitemRepository.findByIdAndBusinessId(wishlistId, businessId);

        if (wishListItem != null) {
            wishListItem.setVisited(visited);
            updateWishListItem(wishListItem);
        } else {
            throw new NoSuchElementException("Wish list item not found for the given IDs");
        }
    }
}
