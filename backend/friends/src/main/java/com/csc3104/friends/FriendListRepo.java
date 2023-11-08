package com.csc3104.friends;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendListRepo extends MongoRepository<FriendList, String>{

    FriendList findFriendListByEmail(String email);

}
