package com.csc3104.friends;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.csc3104.user.UserServiceGrpc;
import com.csc3104.user.Account.UserRequest;
import com.csc3104.user.Account.UserResponse;
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
import net.devh.boot.grpc.client.inject.GrpcClient;

@Service
public class FriendService {
    @Autowired
    private FriendListRepo FriendListRepo;
    @Autowired
    private FriendRepo FriendRepo;
    @Autowired
    private RestTemplate restTemplate;

    @GrpcClient("account")
    private com.csc3104.user.UserServiceGrpc.UserServiceBlockingStub userServiceBlockingStub;

    public List<String> getFriends(String email) {
        FriendList friends = FriendListRepo.findFriendListByEmail(email);
        if (friends != null) {
            List<String> friends1 = friends.getFriends();
            if (friends1 != null && !friends1.isEmpty()) {
                return friends1;
            }
        }
        return null; 
    }

    public boolean checkIfFriend(String email, String user) {
        FriendList friends = FriendListRepo.findFriendListByEmail(email);
        if (friends != null) {
            List<String> friends1 = friends.getFriends();
            if (friends1!=null) {
                for(String obj : friends1) {
                    System.out.println(obj);
                    if(obj.toString().equals(user)){
                        return true;
                    }
                }
            }
            return false;
        }
        else {
            return false;
        }
    }
    public Map<String, Map<String, Object>> getUsersFromName(String email) {
        Map<String, Map<String, Object>> mapping = new HashMap<>();
        Map<String, Object> attributes = new HashMap<>();
        // Establish gRPC channel
        UserRequest req = UserRequest.newBuilder().setEmail(email).build();

        UserResponse response = userServiceBlockingStub.getUserByEmail(req);

        String email2 = response.getEmail();
        String name = response.getFirstname() + " " + response.getLastname();

        attributes.put("name", name);
        attributes.put("email", email2);
        mapping.put(email, attributes);

        System.out.println(mapping);
        return mapping;
    }


    public Map<String, Map<String, Object>> listFriends(List<String> friends, String token) {
        Map<String, Map<String, Object>> mapping = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        if (friends != null && !friends.isEmpty()) {
            for (String email : friends) {
                // Establish gRPC channel
                UserRequest req = UserRequest.newBuilder().setEmail(email).build();

                UserResponse response = userServiceBlockingStub.getUserByEmail(req);

                        String email2 = response.getEmail();
                        String name = response.getFirstname() + " " + response.getLastname();

                        Map<String, Object> attributes = new HashMap<>();
                        attributes.put("name", name);
                        attributes.put("email", email2);
                        mapping.put(email, attributes);

            }
        }
        return mapping;
    }


    public Boolean addFriend(String email, String sender) {
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList sent = FriendListRepo.findFriendListByEmail(sender);

        if (user == null || sent == null) {
            return false;
        }

        List<String> friends = user.getFriends();
        List<String> senderFriends = sent.getFriends();

        if (!friends.contains(sender) && !senderFriends.contains(user.getEmail())) {
            friends.add(sender);
            senderFriends.add(user.getEmail());
            user.setFriends(friends);
            sent.setFriends(senderFriends);

            FriendListRepo.save(user);
            FriendListRepo.save(sent);

            FriendRepo.deleteBySenderAndRecipient(sender, user.getEmail());

            return true;
        } else {
            return false;
        }
    }


    public Boolean removeFriend(String email, String friend) {
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList efriend = FriendListRepo.findFriendListByEmail(friend);
        if (user == null || efriend == null) {
            return false;
        }

        List<String> friends = user.getFriends();
        List<String> efriends = efriend.getFriends();
        if (friends.contains(friend)) {
            friends.remove(friend);
            user.setFriends(friends);
            efriends.remove(email);
            efriend.setFriends(efriends);
            FriendListRepo.save(user);
            FriendListRepo.save(efriend);
            return true;
        } else {
            return false;
        }
    }

    public Boolean makeFriendRequest(String email, String recipient) {
        if (email == recipient) {
            return false;
        }
        Friend Friend = FriendRepo.findBySenderAndRecipient(email, recipient);
        Friend Friend2 = FriendRepo.findBySenderAndRecipient(recipient, email);
        FriendList user = FriendListRepo.findFriendListByEmail(email);
        FriendList efriend = FriendListRepo.findFriendListByEmail(recipient);

        if (user == null) {
            FriendList nUser = new FriendList();
            nUser.setEmail(email);
            FriendListRepo.save(nUser);
        }

        if (efriend == null) {
            FriendList sUser = new FriendList();
            sUser.setEmail(recipient);
            FriendListRepo.save(sUser);
        }

        if (Friend != null || Friend2 != null) {
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
        Friend Friend = FriendRepo.findBySenderAndRecipient(sender, email);
        if (Friend == null) {
            return false;
        }
        else {
            FriendRepo.deleteBySenderAndRecipient(sender, email);
            return true;
        }

    }

    public Map<String, Map<String, Object>> listFriendRequests(String email, String token) {
        Map<String, Map<String, Object>> mapping = new HashMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        List<Friend> friends = FriendRepo.findByRecipient(email);

        for (Friend friend : friends) {
            Map<String, Object> attributes = new HashMap<>();
            // Establish gRPC channel
            UserRequest req = UserRequest.newBuilder().setEmail(friend.getSender()).build();

            UserResponse response = userServiceBlockingStub.getUserByEmail(req);

                    String name = response.getFirstname() + " " + response.getLastname();
                    String email2 = response.getEmail();
                    attributes.put("name", name);
                    attributes.put("email", email2);
                    mapping.put(friend.getSender(), attributes);
        }

        return mapping;
    }

    public List<Friend> listSentFriendRequests(String email) {
        return FriendRepo.findBySender(email);
    }
}


