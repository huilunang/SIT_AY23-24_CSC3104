import React, { useEffect, useState } from "react";
import "./index.css";
import { pushEvent } from "../../../api/notification/EventApiService";
import { getAllNotifications } from "../../../api/notification/NotificationApiService";
import { scheduleInviteNotification } from "../../../api/notification/NotificationApiService";
import { eventInviteNotification } from "../../../api/notification/NotificationApiService";
import { friendRequest } from "../../../api/notification/NotificationApiService";

import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const Notification = ({ isOpen, onClose, updateNotificationCount }) => {

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const eventSource = new EventSource(`http://localhost:8082/notification/stream?to=${email}`);
    
    eventSource.onmessage = (event) => {
      // Use the functional update to ensure all notifications are included
      let content = JSON.parse(event.data);
      console.log(content);
      setNotifications((prevNotifications) => [...prevNotifications, content]);
      setCount((prevCount) => prevCount + 1);
      updateNotificationCount((prevCount) => prevCount + 1); // Update the count in HeaderComponent
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    getAllNotifications()
      .then((response) => successfulResponse(response.data))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Notifications Loaded"));

    function successfulResponse(content) { 
      setNotifications(content);

      // Count the number of unread notifications
      const unreadCount = content.filter(notification => notification.status === 'unread').length;
      setCount(unreadCount);
      updateNotificationCount(unreadCount);      
    }

    function errorResponse(error) {
      console.log(error);
    }
  }, []);

  const resetCount = () => {
    setCount(0); // Reset the count to 0
  };
  
  function successfulResponse(response) {
    console.log("successful. here's data " + response.data);
  }

  function errorResponse(error) {
    console.log(error);
  }
  
  const refreshNotification = async () => {
    getAllNotifications()
    .then((response) => successfulResponse(response.data))
    .catch((error) => errorResponse(error))
    .finally(() => console.log("Notifications Loaded"));

    function successfulResponse(content) { 
      setNotifications(content);
    }

    function errorResponse(error) {
      console.log(error);
    }
  }

  // Update friend details after successfully adding a friend    await callGetAllFriendsByIdApi(); 
  // This will update both friends and friend details
  async function handleAcceptFriendRequest(senderEmail) {  
    try {
      const response = await addFriend(senderEmail);    
      successfulFriendRequestResponse(response);
      setFriends((prevFriends) => [...prevFriends, senderEmail]);
    } catch (error) {    
      errorResponse(error);
    } finally {    
      console.log("Map API cleanup");
    }
  }

  // // Reject the friend request (With the sender's email)
  async function handleRejectFriendRequest(senderEmail) {  
    try {
      const response = await removeFriendRequest(senderEmail);    
      successfulRejectFriendRequestResponse(response);
    } catch (error) {   
      errorResponse(error);
    } finally {    
      console.log("Map API cleanup");
    }
  }

  const acceptEventRequestApi = async (key, owner, member, title, date, time, description, invites, notify, type, status) => {
    try {
      // Wait for the pushEvent and scheduleInviteNotification to complete
      await pushEvent(key, owner, title, date, time, description, invites, notify, type) // Pass the parameters to the API function
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  
      await scheduleInviteNotification(key, owner, title, date, time, description, invites, notify, type, status) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
  
      await eventInviteNotification(key, owner, member, title, date, time, description, invites, notify, type + '-' + 'accepted', status) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      refreshNotification ();
    }
  }
  
  const rejectEventRequestApi = async (key, owner, member, title, date, time, description, invites, notify, type, status) => {
    try {  
      await eventInviteNotification(key, owner, member, title, date, time, description, invites, notify, type + '-' + 'rejected', status) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
        console.error("An error occurred:", error);
        // Handle errors as needed
    }finally {
      refreshNotification ();
    }
  }
  
  const acceptFriendRequestApi  = async (key, owner, member, title, date, time, description, invites, notify, type, status) => {
    try {      
      await handleAcceptFriendRequest(member);

      await friendRequest(owner, member, notify, type + '-' + 'accepted', status) // Pass the parameters to the API function
          .then((response) => successfulResponse(response))
          .catch((error) => errorResponse(error))
          .finally(() => console.log("cleanup"));

    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      refreshNotification ();
    }
  }  

  const rejectFriendRequestApi  = async (key, owner, member, title, date, time, description, invites, notify, type, status) => {
    try {
      await handleRejectFriendRequest(member);

      await friendRequest(owner, member, notify, type + '-' + 'rejected', status) // Pass the parameters to the API function
          .then((response) => successfulResponse(response))
          .catch((error) => errorResponse(error))
          .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
    // Handle errors as needed
    } finally {
      refreshNotification ();
    }
  }  

  return (
    <div>
      <Offcanvas show={isOpen} onHide={() => { onClose(); resetCount(); }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas <Badge pill variant="primary">{count}</Badge></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup variant="flush">
          {[...notifications].reverse().map((notification, index) => (
            <ListGroup.Item as={Row} key={index} style={{display:"flex", flexWrap:"nowrap", flexDirection:"row"}}>
              {notification.type === "event-request" ? (
                <>
                <Col sm="8">
                  <div className="notification-text">
                    <b>You've been invited by {notification.owner} to {notification.title}!</b>
                    <br/> 
                    Date: {notification.date}<br/> 
                    Time: {notification.time}<br/> 
                    Notify: {notification.notify}
                  </div>
                </Col>   
                <Col sm="2">
                  <div onClick={() => rejectEventRequestApi(notification.key, notification.owner, notification.member, notification.title, notification.date, notification.time, notification.description, notification.invites, notification.notify, "event", "rejected")}>
                    <IoCloseCircleOutline style={{ fontSize: '34px', color: "#e7202e" }}/>
                  </div>   
                </Col>    
                <Col sm="2" className="p-0">         
                  <div onClick={() => acceptEventRequestApi(notification.key, notification.owner, notification.member, notification.title, notification.date, notification.time, notification.description, notification.invites, notification.notify, "event", "accepted")}>
                    <IoCheckmarkCircleOutline style={{ fontSize: '34px', color: "#3db04a" }}/>
                  </div>
                </Col> 
                </>
              ): notification.type === "event-accepted" ? (
                <>
                <Col sm="8">
                  <div className="notification-text">
                    <b>You've accepted the invite by {notification.owner} to {notification.title}!</b>
                    <br/> 
                    Date: {notification.date}<br/> 
                    Time: {notification.time}<br/> 
                    Notify: {notification.notify}
                  </div>
                </Col>   
                </>
              ): notification.type === "event-rejected" ? (
                <>
                <Col sm="8">
                  <div className="notification-text">
                    <b>You've rejected the invite by {notification.owner} to {notification.title}!</b>
                    <br/> 
                    Date: {notification.date}<br/> 
                    Time: {notification.time}<br/> 
                    Notify: {notification.notify}
                  </div>
                </Col>   
                </>              
              ): notification.type === "friend-request" ? (
                  <>
                <Col sm="8">
                  <div className="notification-text">
                    <b>{notification.owner} have sent you a friend request</b>
                  </div>
                </Col>   
                <Col sm="2">
                  <div onClick={() => rejectFriendRequestApi(notification.key, notification.owner, notification.member, notification.title, notification.date, notification.time, notification.description, notification.invites, notification.notify, "friend", "rejected")}>
                    <IoCloseCircleOutline style={{ fontSize: '34px', color: "#e7202e" }}/>
                  </div>   
                </Col>    
                <Col sm="2" className="p-0">         
                  <div onClick={() => acceptFriendRequestApi(notification.key, notification.owner, notification.member, notification.title, notification.date, notification.time, notification.description, notification.invites, notification.notify, "friend", "accepted")}>
                    <IoCheckmarkCircleOutline style={{ fontSize: '34px', color: "#3db04a" }}/>
                  </div>
                </Col> 
                </>
              ): notification.type === "friend-accepted" ? (
                <Col sm="8">
                  <div className="notification-text">
                    <b>{notification.owner} is now your friend</b>
                  </div>
                </Col>   
              ): notification.type === "friend-rejected" ? (
                <Col sm="8">
                  <div className="notification-text">
                    <b>{notification.owner} have sent you a friend request</b>
                  </div>
                </Col>   
              ): (
                <Col sm="8">
                  <div className="notification-text">
                    <b>{notification.title} by {notification.owner}</b><br/> 
                    Date: {notification.date}<br/> 
                    Time: {notification.time}<br/> 
                    Notify: {notification.notify}
                  </div>
                </Col> 
              )
              }
            </ListGroup.Item>                
          ))}
        </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notification;