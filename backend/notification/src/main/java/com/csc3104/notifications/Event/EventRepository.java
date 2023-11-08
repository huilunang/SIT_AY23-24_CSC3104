package com.csc3104.notifications.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    Event findByOwner(String owner);

    List<Event> findByMember(String member);

    List<Event> findAllByMemberAndType(String member, String type);

    List<Event> findAllByKeyAndType(String key, String type);
}