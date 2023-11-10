package com.csc3104.poi;

import com.csc3104.wishlistitem.*;

import java.util.Map;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/v1/poi")
public class POIController {
    @Autowired
    private POIService poiService;

    @GetMapping("/{businessId}")
    public POI getPOIDetails(@PathVariable String businessId) {
        return poiService.getPOIRecord(businessId);
    }

    @Autowired
    private WishListItemService wishListItemService;

    // ----- Phil's Code -----

    @GetMapping("/nearby/{location}")
    public ArrayList<POI> getListOfPOIDetailsByNearby(@PathVariable String[] location) {
        return poiService.getPOIByArea(location);
    }

    @GetMapping("/category/{categories}/{location}")
    public ArrayList<POI> getListOfPOIDetailsByCategories(@PathVariable String[] categories, @PathVariable String[] location) {
        return poiService.getPOIByCategories(categories, location);
    }

    // Ends here

    @GetMapping("/{wishlistId}/{businessId}")
    public POI getPOIDetails(@PathVariable String wishlistId, @PathVariable String businessId) {
        POI poi = poiService.getPOIRecord(businessId);

        ObjectId wishlistObjectId = new ObjectId(wishlistId);
        WishListItem wishListItem = wishListItemService.oneWishListItem(wishlistObjectId);
        if (wishListItem == null) {
            return null;
        }

        poi.setRemarks(wishListItem.getRemarks());
        poi.setVisited(wishListItem.isVisited());
        return poi;
    }

    @GetMapping("/suggestions")
    public Map<String, String[]> getSuggestions(@RequestParam String location, @RequestParam String userInput) {
        return poiService.getAutoCompleteSuggestion(location, userInput);
    }

    // Endpoints to update wish list item
    @PutMapping("/{wishlistId}/{businessId}/remarks")
    public ResponseEntity<?> updateWishListItemRemarks(@PathVariable String wishlistId, @PathVariable String businessId,
            @RequestBody Map<String, String> remarks) {
        try {
            wishListItemService.updateWishListItemRemarks(wishlistId, businessId, remarks.get("remarks"));
            return new ResponseEntity<>("Remarks updated successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Wish list item not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{wishlistId}/{businessId}/visited")
    public ResponseEntity<?> updateWishListItemVisited(@PathVariable String wishlistId, @PathVariable String businessId,
            @RequestBody boolean visited) {
        try {
            wishListItemService.updateWishListItemVisited(wishlistId, businessId, visited);
            return new ResponseEntity<>("Visited updated successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Wish list item not found", HttpStatus.NOT_FOUND);
        }
    }
}