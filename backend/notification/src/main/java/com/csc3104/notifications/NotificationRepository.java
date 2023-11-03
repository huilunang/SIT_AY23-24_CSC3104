package com.csc3104.notifications;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.time.LocalDateTime;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    Notification findByOwner(String owner);
    
    List<Notification> findByMember(String member);

    List<Notification> findByTimestampBefore(LocalDateTime currentTime);
    List<Notification> findByTimestampAfter(LocalDateTime currentTime);
}
