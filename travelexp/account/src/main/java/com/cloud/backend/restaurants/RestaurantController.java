package com.cloud.backend.restaurants;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping()
public class RestaurantController {

    private final RestaurantService restaurantService;


    @PostMapping("/home")
    public String getAllRestaurantsByUsername(@RequestBody String email) {
        return "Testing";
    }

//    @GetMapping("/{username}/{id}")
//    public Restaurant getRestaurant(@PathVariable String username, @PathVariable int id) {
//        return restaurantService.findById(id);
//    }
//
//    @DeleteMapping("/{username}/{id}")
//    public ResponseEntity<Void> deleteRestaurant(@PathVariable String username, @PathVariable int id) {
//        return ResponseEntity.noContent().build();
//    }
}
