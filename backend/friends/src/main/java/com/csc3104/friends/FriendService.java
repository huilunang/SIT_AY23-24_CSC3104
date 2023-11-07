package com.csc3104.friends;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FriendService {
    @Autowired
    private FriendListRepo FriendListRepo;
    @Autowired
    private FriendRepo FriendRepo;
    @Autowired
    private RestTemplate restTemplate;

    public List<String> getFriends(String email) {
        FriendList friends = FriendListRepo.findFriendListByEmail(email);
        if (friends != null) {
            List<String> friends1 = friends.getFriends();
            if (friends1 != null && !friends1.isEmpty()) {
                return friends1;
            }
        }
        return null; // Return an empty list if user or friends are null/empty
    }

    public Map<String, Map<String, Object>> getUsersFromName(String email, String token) throws JsonProcessingException {
        Map<String, Map<String, Object>> mapping = new HashMap<>();
        Map<String, Object> attributes = new HashMap<>();

        // Prepare the headers with the token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        String url = "http://account:8081/api/v1/user/{email}";
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, email);
        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            String email2 = jsonNode.get("email").asText();
            String firstname = jsonNode.get("firstname").asText();
            String lastname = jsonNode.get("lastname").asText();
            attributes.put("name", firstname + " " + lastname);
            attributes.put("email", email2);
            mapping.put(email, attributes);

            return mapping;
        } else {
            // Return null or throw an exception upon unsuccessful response
            return null;
        }
    }


    public Map<String, Map<String, Object>> listFriends(List<String> friends, String token) throws JsonProcessingException {
        Map<String, Map<String, Object>> mapping = new HashMap<>();
        String url = "http://account:8081/api/v1/user/";

        // Set up the headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token); // Assuming a Bearer token

        if (friends == null || friends.isEmpty()) {
            return mapping;
        }

        for (String email : friends) {
            Map<String, Object> attributes = new HashMap<>();
            // Make API call to accounts
            Map<String, String> params = new HashMap<>();
            params.put("email", email);

            // Creating the HTTP entity with headers
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url + "{email}", HttpMethod.GET, entity, String.class, params);
            String responseBody = response.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            String email2 = jsonNode.get("email").asText();
            String firstname = jsonNode.get("firstname").asText();
            String lastname = jsonNode.get("lastname").asText();

            attributes.put("name", firstname + " " + lastname);
            attributes.put("email", email2);
            mapping.put(email, attributes);
        }

        System.out.println(mapping);
        return mapping;
    }

    public Boolean addFriend(String email, String sender) {
        // Step 1: Check if the user with 'id' exists
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList sent = FriendListRepo.findFriendListByEmail(sender);

        if (user == null || sent == null) {
            System.out.println("Oh no! Where are the users?");
            return false;
            // Handle the case where the user doesn't exist
        }

        // Step 2: Check if 'sender' is already in the user's friends list
        List<String> friends = user.getFriends();
        List<String> senderFriends = sent.getFriends();

        if (!friends.contains(sender) && !senderFriends.contains(user.getEmail())) {
            // Step 3: Add 'sender' to the user's friends list
            friends.add(sender);
            senderFriends.add(user.getEmail());
            user.setFriends(friends);
            sent.setFriends(senderFriends);

            // Step 4: Save the updated user data in MongoDB
            FriendListRepo.save(user);
            FriendListRepo.save(sent);

            FriendRepo.deleteBySenderAndRecipient(sender, user.getEmail());

            return true;
        } else {
            // Handle the case where 'sender' is already in the user's friends list
            return false;
        }
    }


    public Boolean removeFriend(String email, String friend) {
        // Step 1: Check if the user with 'id' exists
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList efriend = FriendListRepo.findFriendListByEmail(friend);
        if (user == null || efriend == null) {
            // Handle the case where the user doesn't exist
            return false;
        }

        // Step 2: Check if friend is already in the user's friends list
        List<String> friends = user.getFriends();
        List<String> efriends = efriend.getFriends();
        if (friends.contains(friend)) {
            // Step 3: Remove from friends list
            friends.remove(friend);
            user.setFriends(friends);
            efriends.remove(email);
            efriend.setFriends(efriends);
            // Step 4: Save the updated user data in MongoDB
            FriendListRepo.save(user);
            FriendListRepo.save(efriend);
            return true;
        } else {
            // Handle the case where 'sender' is already in the user's friends list
            return false;
        }
    }

    public Boolean makeFriendRequest(String email, String recipient) {
        // Step 1: Check if the user with 'id' exists
        Friend Friend = FriendRepo.findBySenderAndRecipient(email, recipient);
        Friend Friend2 = FriendRepo.findBySenderAndRecipient(recipient, email);
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList efriend = FriendListRepo.findFriendListByEmail(recipient);

        if (user == null) {
            FriendList nUser = new FriendList();
            nUser.setEmail(email);
            FriendListRepo.save(nUser);
            // Handle the case where the user doesn't exist
        }

        if (efriend == null) {
            FriendList sUser = new FriendList();
            sUser.setEmail(recipient);
            FriendListRepo.save(sUser);
        }

        if (Friend != null || Friend2 != null) {
            // Handle the case where the user doesn't exist
            return false;
        }
        else {
            Friend friendRequest = new Friend();
            friendRequest.setSender(email);
            friendRequest.setRecipient(recipient);
            FriendRepo.save(friendRequest);
            return true;
        }

    }

    public Boolean removeFriendRequest(String email, String sender) {
        // Step 1: Check if the user with 'id' exists
        Friend Friend = FriendRepo.findBySenderAndRecipient(sender, email);
        if (Friend == null) {
            // Handle the case where the user doesn't exist
            return false;
        }
        else {
            FriendRepo.deleteBySenderAndRecipient(sender, email);
            return true;
        }

    }

    public Map<String, Map<String, Object>> listFriendRequests(String email, String token) throws JsonProcessingException {
        Map<String, Map<String, Object>> mapping = new HashMap<>();
        List<Friend> friends = FriendRepo.findByRecipient(email);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token); // Assuming it's a Bearer token

        String url = "http://account:8081/api/v1/user/";

        for (Friend friend : friends) {
            Map<String, Object> attributes = new HashMap<>();
            Map<String, String> params = new HashMap<>();
            params.put("email", friend.getSender());

            HttpEntity<String> entity = new HttpEntity<>(headers); // Include headers in the request

            ResponseEntity<String> response = restTemplate.exchange(
                    url + "{email}", HttpMethod.GET, entity, String.class, params);

            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            String firstname = jsonNode.get("firstname").asText();
            String lastname = jsonNode.get("lastname").asText();

            attributes.put("name", firstname + " " + lastname);
            mapping.put(friend.getSender(), attributes);
        }
        return mapping;
    }


    public List<Friend> listSentFriendRequests(String email) {
        return FriendRepo.findBySender(email);
    }
}


