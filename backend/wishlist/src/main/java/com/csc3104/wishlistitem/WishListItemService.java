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
