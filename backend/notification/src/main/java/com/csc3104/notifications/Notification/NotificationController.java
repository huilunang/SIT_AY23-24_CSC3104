package com.csc3104.notifications.Notification;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csc3104.notifications.PastNotification.PastNotification;
import com.csc3104.notifications.PastNotification.PastNotificationRepository;

import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    private NotificationRepository repository;

    @Autowired
    private PastNotificationRepository pastRepository;

    public final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/friend-request")
    public ResponseEntity<String> friendRequestNotification(@RequestBody Map<String, String> payload) {
        String owner = payload.get("owner");
        String member = payload.get("member");
        String type = payload.get("type");
        String notify = payload.get("notify");
        String status = payload.get("status");
        long unixTimestamp = Instant.now().getEpochSecond();
        Instant instant = Instant.ofEpochMilli(unixTimestamp);
        LocalDateTime utcTimestamp = instant.atZone(ZoneId.of("UTC")).toLocalDateTime();

        if (status.equals("requested")){
            notificationService.pushNotificationToQueue("key", owner, member, "title", "date", "time", "description", "invites", utcTimestamp, type, notify, status);
            pastRepository.save(new PastNotification("key", owner, member, "title", "date", "time", "description", "invites", utcTimestamp, type, notify, "unread"));
        }else if (status.equals("accepted")){
            List<PastNotification> pastNotifications = pastRepository.findAllByOwnerAndMemberAndType(owner, member, "friend-request");
            for (PastNotification notification : pastNotifications) {
                notification.setType(type);
            }
            pastRepository.saveAll(pastNotifications);
            notificationService.pushNotificationToQueue("key", member, owner, "title", "date", "time", "description", "invites", utcTimestamp, type, notify, status);
            pastRepository.save(new PastNotification("key", member, owner, "title", "date", "time", "description", "invites", utcTimestamp, type, notify, "unread"));
        }else if (status.equals("rejected")){
            List<PastNotification> pastNotifications = pastRepository.findAllByOwnerAndMemberAndType(owner, member, "friend-request");
            for (PastNotification notification : pastNotifications) {
                notification.setType(type);
            }
            pastRepository.saveAll(pastNotifications);
        }
        return ResponseEntity.ok("Notification updated: user: " + member + ", msg: " + "friend request");
    }

    @PostMapping("/event-request")
    public ResponseEntity<String> eventRequestNotification(@RequestBody Map<String, String> payload) {
        String key = payload.get("key");
        String owner = payload.get("owner");
        String member = payload.get("member");
        String type = payload.get("type");

        List<PastNotification> pastNotifications = pastRepository.findAllByKeyAndOwnerAndMemberAndType(key, owner, member, "event-request");
        for (PastNotification notification : pastNotifications) {
            notification.setType(type);
        }
        pastRepository.saveAll(pastNotifications);
        return ResponseEntity.ok("Notification updated: user: " + member + ", msg: " + "friend request");
    }

    @PostMapping("/schedule")
    public ResponseEntity<String> scheduleNotification(@RequestBody Map<String, String> payload, @RequestParam("to") String to) {
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

        // Convert the Unix timestamp to a long
        long unixTimestamp = Long.parseLong(timestamp);

        // Convert Unix timestamp to LocalDateTime in a specific time zone (e.g., UTC)
        Instant instant = Instant.ofEpochMilli(unixTimestamp);
        LocalDateTime utcTimestamp = instant.atZone(ZoneId.of("UTC")).toLocalDateTime();

        if (member.equals(to)) { // Check if the recipient matches the intended recipient
            if (status.equals("requested")){
                notificationService.sendEmailRequest(owner, member, title, date, time, description, invites);
                notificationService.pushNotificationToQueue(key, owner, member, title, date, time, description, invites, utcTimestamp, type, notify, status);
                pastRepository.save(new PastNotification(key, owner, member, title, date, time, description, invites, utcTimestamp, type, notify, "unread"));
            }else if (status.equals("accepted")){
                repository.save(new Notification(key, owner, member, title, date, time, description, invites, utcTimestamp, type, notify, status));
            }
            // notificationService.pushNotificationToQueue(name, role, message,recipient, sender, timestamp, type);
            return ResponseEntity.ok("Notification scheduled: user: " + member + ", msg: " + title);
        }
        return ResponseEntity.ok("Notification not scheduled for this recipient");
    }

    // Immediate Notification
    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<Notification>> streamNotifications(@RequestParam("to") String to) {
        if (!notificationService.notificationQueue.isEmpty()){
            return notificationService.removeNotificationFromQueue(to)
                .filter(notification -> notification.getMember().equals(to))
                .map(notification -> ServerSentEvent.<Notification>builder()
                    .data(notification)
                    .build());
        }
        return Flux.empty();
    }

    @PostMapping("/past")
    public List<PastNotification> getPastNotifications(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        List<PastNotification> pastNotifications = pastRepository.findAllByMember(email);
        return pastNotifications;
    }

    @PostMapping("/read")
    public void readPastNotifications(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");        
        String newStatus = "read";

        List<PastNotification> pastNotifications = pastRepository.findAllByMember(email);
        for (PastNotification notification : pastNotifications) {
            notification.setStatus(newStatus);
        }
    
        pastRepository.saveAll(pastNotifications);
    }

    @PostMapping("/delete")
    public void deletePastNotifications(@RequestBody Map<String, String> payload) {        
        String key = payload.get("key");    
        String member = payload.get("member");        
        String type = payload.get("type");        

        List<PastNotification> pastNotifications = pastRepository.findAllByKeyAndMemberAndType(key, member, type);
    
        // Delete documents from the collection
        pastRepository.deleteAll(pastNotifications);
    }
}