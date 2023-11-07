package com.csc3104.friends;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface FriendRepo extends MongoRepository<Friend,String>{
    Friend findBySenderAndRecipient(String sender, String recipient);

    void deleteBySenderAndRecipient(String sender, String recipient);

    List<Friend> findByRecipient(String recipient);

    List<Friend> findBySender(String sender);
}
