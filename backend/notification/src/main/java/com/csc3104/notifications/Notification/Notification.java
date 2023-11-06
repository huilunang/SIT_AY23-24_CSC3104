package com.csc3104.notifications.Notification;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Objects;
import java.time.LocalDateTime;

// @Entity
@Document(collection = "notifications")
class Notification {
  @Id
  public String id;
  @Field("key")
  public String key;
  @Field("owner")
  public String owner;
  @Field("member")
  public String member;
  @Field("title")
  public String title;
  @Field("date")
  public String date;
  @Field("time")
  public String time;
  @Field("description")
  public String description;
  @Field("invites")
  public String invites;
  @Field("timestamp")
  public LocalDateTime timestamp;
  @Field("type")
  public String type;
  @Field("notify")
  public String notify;
  @Field("status")
  public String status;

  Notification() {}

  Notification(String key, String owner, String member, String title, String date, String time, String description, String invites, LocalDateTime timestamp, String type, String notify, String status) {
    this.key = key;
    this.owner = owner;
    this.member = member;
    this.title = title;
    this.date = date;
    this.time = time;
    this.description = description;
    this.invites = invites;
    this.timestamp = timestamp;
    this.type = type;
    this.notify = notify;
    this.status = status;
  }

  // Get
  public String getId() {
    return this.id;
  }

  public String getKey() {
    return this.key;
  }

  public String getOwner() {
    return this.owner;
  }

  public String getMember() {
    return this.member;
  }

  public String getTitle() {
    return this.title;
  }

  public String getDate() {
    return this.date;
  }

  public String getTime() {
    return this.time;
  }

  public String getDescription() {
    return this.description;
  }

  public String getInvites() {
    return this.invites;
  }

  public LocalDateTime getTimestamp() {
    return this.timestamp;
  }

  public String getType() {
    return this.type;
  }

  public String getNotify() {
    return this.notify;
  }

  public String getStatus() {
    return this.status;
  }

  // Set 
  public void setId(String id) {
    this.id = id;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }

  public void setMember (String member) {
    this.member = member;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setInvites(String invites) {
    this.invites = invites;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public void setType(String type) {
    this.type = type;
  }

  public void setNotify(String notify) {
    this.notify = notify;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (!(o instanceof Notification))
      return false;
    Notification notification = (Notification) o;
    return Objects.equals(this.id, notification.id) && Objects.equals(this.owner, notification.owner)
        && Objects.equals(this.title, notification.title);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.owner, this.title);
  }

  @Override
  public String toString() {
    return String.format(
        "Notification[id=%s, key='%s', owner='%s', member='%s', title='%s', date='%s', time='%s', description='%s', invites='%s', timestamp='%s', type='%s', notify='%s', status='%s']",
        id, key, owner, member, title, date, time, description, invites, timestamp, type, notify, status);
  }
}