package com.csc3104.friends;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FriendListRepo extends MongoRepository<FriendList, String>{

    FriendList findFriendsByEmail(String email);

}
