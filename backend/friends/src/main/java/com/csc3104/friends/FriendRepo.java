package com.csc3104.friends;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepo extends MongoRepository<Friend,String>{
    Friend findBySenderAndRecipient(String sender, String recipient);

    void deleteBySenderAndRecipient(String sender, String recipient);

    List<Friend> findByRecipient(String recipient);

    List<Friend> findBySender(String sender);
}
