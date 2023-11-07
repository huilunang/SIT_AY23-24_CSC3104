package com.csc3104.friends;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Data
@Document(collection = "friendlist")
public class FriendList {
    @Id
    @Field("email")
    private String email;
    @Field("friends")
    private List<String> friends;

    public FriendList() {
        this.friends = new ArrayList<>(); // Initialize the blank list as an empty ArrayList
    }
    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

