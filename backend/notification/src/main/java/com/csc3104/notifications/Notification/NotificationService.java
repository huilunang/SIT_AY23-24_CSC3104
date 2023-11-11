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

    public void pushNotificationToQueue(String key, String owner, String member, String title, String date, String time,
            String description, String invites, LocalDateTime timestamp, String type, String notify, String status, String url, String dest) {
        Notification notification = new Notification(key, owner, member, title, date, time, description, invites,
                timestamp, type, notify, status, url, dest);
        notificationQueue.add(notification);
        System.out.println("added to queue");
    }

    public Flux<Notification> removeNotificationFromQueue(String to) {
        System.out.println("called removing request: queue");
        if (!notificationQueue.isEmpty()) {
            Notification notification = notificationQueue.get(0);
            notificationQueue.remove(0);
            System.out.println("removed from queue");
            return Flux.just(notification);
        } else {
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
            pushNotificationToQueue(overduedNotification.getKey(), overduedNotification.getOwner(),
                    overduedNotification.getMember(), overduedNotification.getTitle(), overduedNotification.getDate(),
                    overduedNotification.getTime(), overduedNotification.getDescription(),
                    overduedNotification.getInvites(), overduedNotification.getTimestamp(),
                    overduedNotification.getType(), overduedNotification.getNotify(), overduedNotification.getStatus(), overduedNotification.getUrl(), overduedNotification.getDest());

            if (overduedNotification.getNotify().equals("true")
                    && overduedNotification.getStatus().equals("accepted")) {
                sendEmailNotification(overduedNotification.getOwner(), overduedNotification.getMember(),
                        overduedNotification.getTitle(), overduedNotification.getDate(), overduedNotification.getTime(),
                        overduedNotification.getDescription(), overduedNotification.getInvites(), overduedNotification.getUrl(), overduedNotification.getDest());
            }

            // Delete the notification after it's sent
            pastRepository.save(new PastNotification(overduedNotification.getKey(), overduedNotification.getOwner(),
                    overduedNotification.getMember(), overduedNotification.getTitle(), overduedNotification.getDate(),
                    overduedNotification.getTime(), overduedNotification.getDescription(),
                    overduedNotification.getInvites(), overduedNotification.getTimestamp(),
                    overduedNotification.getType(), overduedNotification.getNotify(), "unread", overduedNotification.getUrl(), overduedNotification.getDest()));
            repository.delete(overduedNotification);
        }
    }

    public void sendEmailNotification(String owner, String member, String title, String date, String time,
            String description, String invites, String url, String dest) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String htmlContent = "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Event Invitation</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Arial', sans-serif;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            background-color: #f4f4f4;\n" +
                "        }\n" +
                "\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "\n" +
                "        h1 {\n" +
                "            color: #333;\n" +
                "        }\n" +
                "\n" +
                "        p {\n" +
                "            color: #555;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Event Invitation</h1>\n" +
                "        <p><strong>Event Details:</strong></p>\n" +
                "        <img src=" + url + "alt=\"Event Image\">\n" +
                "        <ul>\n" +
                "            <li><strong>From:</strong> " + owner + "</li>\n" +
                "            <li><strong>To:</strong> " + member + "</li>\n" +
                "            <li><strong>Title:</strong> " + title + "</li>\n" +
                "            <li><strong>Date:</strong> " + date + "</li>\n" +
                "            <li><strong>Time:</strong> " + time + "</li>\n" +
                "            <li><strong>Venus:</strong> " + dest + "</li>\n" +
                "            <li><strong>Description:</strong> " + description + "</li>\n" +
                "        </ul>\n" +
                "       <p><strong>View other invitees on <a href='http://localhost:30002/'>TravelExp</a>.<strong></p>" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";

        try {
            helper.setFrom("TravelExp <noreply@example.com>");
            helper.setTo(member);
            helper.setSubject(title + " is happening now!");
            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception or log it
        }
    }

    public void sendEmailRequest(String owner, String member, String title, String date, String time,
            String description, String invites, String url, String dest) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String htmlContent = "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Event Invitation</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Arial', sans-serif;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            background-color: #f4f4f4;\n" +
                "        }\n" +
                "\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "\n" +
                "        h1 {\n" +
                "            color: #333;\n" +
                "        }\n" +
                "\n" +
                "        p {\n" +
                "            color: #555;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Event Invitation</h1>\n" +
                "        <p><strong>Event Details:</strong></p>\n" +
                "        <img src=" + url + "alt=\"Event Image\">\n" +
                "        <ul>\n" +
                "            <li><strong>From:</strong> " + owner + "</li>\n" +
                "            <li><strong>To:</strong> " + member + "</li>\n" +
                "            <li><strong>Title:</strong> " + title + "</li>\n" +
                "            <li><strong>Date:</strong> " + date + "</li>\n" +
                "            <li><strong>Time:</strong> " + time + "</li>\n" +
                "            <li><strong>Venus:</strong> " + dest + "</li>\n" +
                "            <li><strong>Description:</strong> " + description + "</li>\n" +
                "        </ul>\n" +
                "       <p><strong>View other invitees on <a href='http://localhost:30002/'>TravelExp</a>.<strong></p>" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";

        try {
            helper.setFrom("TravelExp <noreply@example.com>");
            helper.setTo(member);
            helper.setSubject("You've been invited" + " to " + title);
            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception or log it
        }
    }

    public void sendEmailUpcoming(String owner, String member, String title, String date, String time,
            String description, String invites, String url, String dest) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String htmlContent = "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Event Invitation</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: 'Arial', sans-serif;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            background-color: #f4f4f4;\n" +
                "        }\n" +
                "\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "\n" +
                "        h1 {\n" +
                "            color: #333;\n" +
                "        }\n" +
                "\n" +
                "        p {\n" +
                "            color: #555;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <h1>Event Invitation</h1>\n" +
                "        <p><strong>Event Details:</strong></p>\n" +
                "        <img src=" + url + "alt=\"Event Image\">\n" +
                "        <ul>\n" +
                "            <li><strong>From:</strong> " + owner + "</li>\n" +
                "            <li><strong>To:</strong> " + member + "</li>\n" +
                "            <li><strong>Title:</strong> " + title + "</li>\n" +
                "            <li><strong>Date:</strong> " + date + "</li>\n" +
                "            <li><strong>Time:</strong> " + time + "</li>\n" +
                "            <li><strong>Venus:</strong> " + dest + "</li>\n" +
                "            <li><strong>Description:</strong> " + description + "</li>\n" +
                "        </ul>\n" +
                "       <p><strong>View other invitees on <a href='http://localhost:30002/'>TravelExp</a>.<strong></p>" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";

        try {
            helper.setFrom("TravelExp <noreply@example.com>");
            helper.setTo(member);
            helper.setSubject("You have an upcoming event" + " to " + title);
            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception or log it
        }
    }
}
