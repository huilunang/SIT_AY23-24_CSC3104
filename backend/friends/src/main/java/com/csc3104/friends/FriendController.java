package com.csc3104.friends;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/friends")
public class FriendController {
    @Autowired
    private FriendService friendService;

    @GetMapping("/getFriends")
    public ResponseEntity<List<String>> getFriends(@RequestParam String email) {
        List<String> friends = friendService.getFriends(email);
        if (friends != null) {
            return ResponseEntity.ok(friends);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getUsersByName")
    public ResponseEntity<Map<String, Map<String, Object>>> getUsersByName(@RequestParam String email) throws JsonProcessingException {
        Map<String, Map<String, Object>> users  = friendService.getUsersFromName(email);
        if (users != null) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/listFriends")
    public ResponseEntity<Map<String, Map<String, Object>>> listFriends(@RequestBody List<String> friends) throws JsonProcessingException {
        Map<String, Map<String, Object>> result = friendService.listFriends(friends);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/addFriend")
    public ResponseEntity<Boolean> addFriend(@RequestBody Map<String, String> requestData) throws JsonProcessingException {
        String email = requestData.get("email");
        String sender = requestData.get("sender");
        Boolean added = friendService.addFriend(email, sender);
        if (added) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/removeFriend")
    public ResponseEntity<Boolean> removeFriend(@RequestBody Map<String, String> requestData) throws JsonProcessingException {
        String email = requestData.get("email");
        String friend = requestData.get("friend");
        Boolean removed = friendService.removeFriend(email, friend);
        if (removed) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/removeFriendRequest")
    public ResponseEntity<Boolean> removeFriendRequest(@RequestBody Map<String, String> requestData) {
        String email = requestData.get("email");
        String sender = requestData.get("sender");
        Boolean removed = friendService.removeFriendRequest(email, sender);
        if (removed) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
    @PostMapping("/makeFriendRequest")
    public ResponseEntity<Boolean> makeFriendRequest(@RequestBody Map<String, String> requestData) {
        String email = requestData.get("email");
        String recipient = requestData.get("recipient");
        Boolean created = friendService.makeFriendRequest(email, recipient);
        if (created) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/listFriendRequests")
    public ResponseEntity<Map<String, Map<String, Object>>> listFriendRequests(@RequestParam String email) throws JsonProcessingException {
        Map<String, Map<String, Object>> result = friendService.listFriendRequests(email);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/test")
    public int getFriends() {
        return 4;
    }
}


