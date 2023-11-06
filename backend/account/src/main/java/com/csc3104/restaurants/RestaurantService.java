package com.csc3104.restaurants;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Service
public class RestaurantService {
    private static List<Restaurant> restaurantList = new ArrayList<>();

    static {
        restaurantList.add(new Restaurant("Astro", false, "joe@gmail.com"));
        restaurantList.add(new Restaurant("Collins", false, "Peter"));
        restaurantList.add(new Restaurant("Gordan's", false, "Stan"));
    }

    // CREATE
    public void addRestaurant(Restaurant restaurant) {
        restaurantList.add(restaurant);
    }

    // READ
    public List<Restaurant> getAllRestaurants() {
        return restaurantList;
    }

//    public List<Restaurant> findByEmail(String email){
//        Predicate<? super Restaurant> predicate =
//                todo -> todo.getEmail().equalsIgnoreCase(email);
//        return restaurantList.stream().filter(predicate).toList();
//    }


    public Restaurant findById(int id) {
        Predicate<? super Restaurant> predicate = restaurant -> restaurant.getId() == id;
        return restaurantList.stream().filter(predicate).findFirst().get();
    }

    public void deleteById(int id) {
        Predicate<? super Restaurant> predicate = restaurant -> restaurant.getId() == id;
        restaurantList.removeIf(predicate);
    }
}
