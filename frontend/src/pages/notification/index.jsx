import React, { useEffect, useState } from "react";
import "./index.css";
import { getAllNotifications } from "../../api/NotificationApiService";

import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

const Notification = ({ isOpen, onClose, updateNotificationCount }) => {

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [inboxs, setInboxs] = useState([]);

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
      .finally(() => console.log("inboxs"));

    function successfulResponse(content) { 
      // console.log(data); 
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
  
  return (
    <div>
      <Offcanvas show={isOpen} onHide={() => { onClose(); resetCount(); }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas <Badge pill variant="primary">{count}</Badge></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup variant="flush">
          {[...notifications].reverse().map((notification, index) => (
            <ListGroup.Item action key={index}>
              <div className="notification-text">
                {index+1}. {notification.status} {notification.name} {notification.message} {notification.sender} {notification.recipient} {notification.timestamp}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notification;