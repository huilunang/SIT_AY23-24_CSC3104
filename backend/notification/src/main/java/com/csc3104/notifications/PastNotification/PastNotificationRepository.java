package com.csc3104.notifications.PastNotification;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.time.LocalDateTime;

public interface PastNotificationRepository extends MongoRepository<PastNotification, String> {
    List<PastNotification> findByOwner(String owner);

    List<PastNotification> findByMember(String member);

    List<PastNotification> findAllByMember(String member);

    List<PastNotification> findAllByKeyAndMemberAndType(String key, String member, String type);

    List<PastNotification> findAllByKey(String key);

    List<PastNotification> findAllByKeyAndMember(String key, String member);

    List<PastNotification> findAllByOwnerAndMemberAndType(String owner, String member, String type);

    List<PastNotification> findAllByKeyAndOwnerAndMemberAndType(String key, String owner, String member, String type);

    List<PastNotification> findByTimestampBefore(LocalDateTime currentTime);

    List<PastNotification> findByTimestampAfter(LocalDateTime currentTime);

    List<PastNotification> findByMemberAndTimestampBefore(String member, LocalDateTime currentTime);
}
