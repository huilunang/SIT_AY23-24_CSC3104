package com.csc3104.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventRepository repository;

    public final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/all")
    public List<Event> getCurrentEvents(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        List<Event> Events = repository.findAllByMemberAndType(email, "event");
        return Events;
    }

    @PostMapping("/party")
    public List<Event> getParty(@RequestBody Map<String, String> requestBody) {
        String key = requestBody.get("key");

        List<Event> Events = repository.findAllByKeyAndType(key, "event");
        return Events;
    }

    @PostMapping("/push")
    public ResponseEntity<String> createEvent(@RequestBody Map<String, String> payload, @RequestParam("to") String to) {
      String key = payload.get("key");
      String owner = payload.get("owner");
      String member = payload.get("member");
      String title = payload.get("title");
      String date = payload.get("date");
      String time = payload.get("time");
      String description = payload.get("description");
      String invites = payload.get("invites");
      String timestamp = payload.get("timestamp");
      String type = payload.get("type");
      String notify = payload.get("notify");
      String status = payload.get("status");
      repository.save(new Event(key, owner, member, title, date, time, description, invites, timestamp, type, notify, status));

      return ResponseEntity.ok("Event created : " + key);
    }
}