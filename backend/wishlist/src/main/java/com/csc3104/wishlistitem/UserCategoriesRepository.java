package com.csc3104.wishlistitem;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCategoriesRepository extends MongoRepository<UserCategories, ObjectId> {
    UserCategories findByEmail(String email);
}
