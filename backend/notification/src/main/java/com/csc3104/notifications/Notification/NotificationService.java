package com.csc3104.notifications.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csc3104.notifications.PastNotification.PastNotification;
import com.csc3104.notifications.PastNotification.PastNotificationRepository;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import reactor.core.publisher.Flux;

import java.util.List;
import java.util.ArrayList;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class NotificationService {    
    // override gRPC generated code
    @Autowired
    private NotificationRepository repository;

    @Autowired
    private PastNotificationRepository pastRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    public final List<Notification> notificationQueue = new ArrayList<>();

    public void pushNotificationToQueue(String key, String owner, String member, String title, String date, String time, String description, String invites, LocalDateTime timestamp, String type, String notify, String status) {
        Notification notification = new Notification(key, owner, member, title, date, time, description, invites, timestamp, type, notify, status);
        notificationQueue.add(notification);
        System.out.println("added to queue");
    }

    public Flux<Notification> removeNotificationFromQueue(String to) {
        System.out.println("called removing request: queue");
        if (!notificationQueue.isEmpty()){
            Notification notification = notificationQueue.get(0);
            notificationQueue.remove(0);
            System.out.println("removed from queue");    
            return Flux.just(notification);
        }else{
            return Flux.empty();
        }
    }    

    @Scheduled(fixedRate = 10000) // Check every 10 seconds
    public void checkScheduledNotifications() {
        Instant instant = Instant.now();
        LocalDateTime currentTime = instant.atZone(ZoneId.of("UTC")).toLocalDateTime(); 
        System.out.println("Checking at " + currentTime);

        List<Notification> overduedNotifications = repository.findByTimestampBefore(currentTime);
        for (Notification overduedNotification : overduedNotifications) {
            pushNotificationToQueue(overduedNotification.getKey(), overduedNotification.getOwner(), overduedNotification.getMember(), overduedNotification.getTitle(), overduedNotification.getDate(), overduedNotification.getTime(), overduedNotification.getDescription(), overduedNotification.getInvites(), overduedNotification.getTimestamp(), overduedNotification.getType(), overduedNotification.getNotify(), overduedNotification.getStatus());
            
            if (overduedNotification.getNotify().equals("true") && overduedNotification.getStatus().equals("accepted")){
                sendEmailNotification(overduedNotification.getOwner(), overduedNotification.getMember(), overduedNotification.getTitle(), overduedNotification.getDate(), overduedNotification.getTime(), overduedNotification.getDescription(), overduedNotification.getInvites());
            }
            
            // Delete the notification after it's sent
            pastRepository.save(new PastNotification(overduedNotification.getKey(), overduedNotification.getOwner(), overduedNotification.getMember(), overduedNotification.getTitle(), overduedNotification.getDate(), overduedNotification.getTime(), overduedNotification.getDescription(), overduedNotification.getInvites(), overduedNotification.getTimestamp(), overduedNotification.getType(), overduedNotification.getNotify(), "unread"));
            repository.delete(overduedNotification);
        }
    }

    public void sendEmailNotification(String owner, String member, String title, String date, String time, String description, String invites) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(member);
            helper.setSubject(title);
            helper.setText(
                "Description: " + description
                + "<br>" + 
                "Date: " + date
                + "<br>" + 
                "Time: " + time
                , true
            );

            javaMailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception or log it
        }
    }

    public void sendEmailRequest(String owner, String member, String title, String date, String time, String description, String invites) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(member);
            helper.setSubject("You've been invited by " + owner + " to " + title);
            helper.setText(
                "Description: " + description
                + "<br>" + 
                "Date: " + date
                + "<br>" + 
                "Time: " + time
                , true
                ); 

            javaMailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception or log it
        }
    }
}
