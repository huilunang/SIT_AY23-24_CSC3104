package com.csc3104.poi; 
 
import org.bson.types.ObjectId; 
import org.springframework.data.mongodb.repository.MongoRepository; 
import org.springframework.stereotype.Repository; 
 
@Repository 
public interface POIRepository extends MongoRepository<POI, ObjectId> { 
     
}
