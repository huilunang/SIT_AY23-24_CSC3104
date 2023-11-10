package com.csc3104.notifications.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

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

    @GetMapping("/{businessId}")
    public Map<String, String> getDetails(@PathVariable String businessId){
        return eventService.sendDetailsToEvents(businessId);
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
        String url = payload.get("url");
        String dest = payload.get("dest");
        repository.save(new Event(key, owner, member, title, date, time, description, invites, timestamp, type, notify, url, dest));

        return ResponseEntity.ok("Event created : " + key);
    }

    @GetMapping("/user")
    public ResponseEntity<String> getUserData(@RequestHeader("Authorization") String token, @RequestParam("email") String email) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", token); // Replace with your actual token

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                "http://account:8081/api/v1/user/" + email, 
                HttpMethod.GET, 
                entity, 
                String.class
            );

            // Retrieve the response body
            String response = responseEntity.getBody();
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/delete")
    public void deleteEvent(@RequestBody Map<String, String> payload) {
        String key = payload.get("key");
        String type = payload.get("type");

        List<Event> event = repository.findAllByKeyAndType(key, type);

        // Delete documents from the collection
        repository.deleteAll(event);
    }

}