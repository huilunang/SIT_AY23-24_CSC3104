package com.csc3104.notifications;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.time.LocalDateTime;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    Notification findByName(String name);
    
    List<Notification> findBySender(String sender);
    List<Notification> findByRecipient(String recipient);

    List<Notification> findByTimestampBefore(LocalDateTime currentTime);
    List<Notification> findByTimestampAfter(LocalDateTime currentTime);
}
