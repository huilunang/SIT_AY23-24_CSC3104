package com.csc3104.notifications.Event;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Objects;

// @Entity
@Document(collection = "events")
class Event {
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
  public String timestamp;
  @Field("type")
  public String type;
  @Field("notify")
  public String notify;
  @Field("url")
  public String url;
  @Field("dest")
  public String dest;

  Event() {
  }

  Event(String key, String owner, String member, String title, String date, String time, String description,
      String invites, String timestamp, String type, String notify, String url, String dest) {
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
    this.url = url;
    this.dest = dest;
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

  public String getTimestamp() {
    return this.timestamp;
  }

  public String getType() {
    return this.type;
  }

  public String getNotify() {
    return this.notify;
  }

  public String getUrl() {
    return this.url;
  }

  public String getDest() {
    return this.dest;
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

  public void setMember(String member) {
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

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public void setType(String type) {
    this.type = type;
  }

  public void setNotify(String notify) {
    this.notify = notify;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public void setDest(String dest) {
    this.dest = dest;
  }
}
