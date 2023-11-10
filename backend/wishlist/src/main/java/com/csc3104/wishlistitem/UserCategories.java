package com.csc3104.wishlistitem;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user_categories")
public class UserCategories {
    @Id
    private String id;
    private String email;
    private List<String> categories;

    public UserCategories(String email, List<String> categories) {
        this.email = email;
        this.categories = categories;
    }

}