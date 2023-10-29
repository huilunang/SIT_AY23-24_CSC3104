package com.csc3104.notifications;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.time.LocalDateTime;

public interface PastNotificationRepository extends MongoRepository<PastNotification, String> {
    PastNotification findByName(String name);
    
    List<PastNotification> findBySender(String sender);
    List<PastNotification> findByRecipient(String recipient);
    List<PastNotification> findAllByRecipient(String recipient);

    List<PastNotification> findByTimestampBefore(LocalDateTime currentTime);
    List<PastNotification> findByTimestampAfter(LocalDateTime currentTime);
    List<PastNotification> findByRecipientAndTimestampBefore(String recipient, LocalDateTime currentTime);
}
