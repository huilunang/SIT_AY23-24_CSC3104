import React, { useEffect, useState } from "react";
import "./index.css";

import { pushEvent } from "../../../api/notification/EventApiService";

import { getAllNotifications } from "../../../api/notification/NotificationApiService";
import { scheduleInviteNotification } from "../../../api/notification/NotificationApiService";
import { eventInviteNotification } from "../../../api/notification/NotificationApiService";
import { friendRequest } from "../../../api/notification/NotificationApiService";

import { addFriend } from "../../../api/friends/FriendsApiService";
import { removeFriendRequest } from "../../../api/friends/FriendsApiService";

import { getUserName } from "../../../api/notification/EventApiService";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const Notification = ({ isOpen, onClose, updateNotificationCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(0);
  const [count, setCount] = useState(0);

  const [lock, setLock] = useState(false);
  const [eventLock, setEventLock] = useState(false);
  const [friendLock, setFriendLock] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (isOpen) {
      // Call the refreshNotification function when the modal is open
      refreshNotification();
    }
  }, [isOpen]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8083/notification/stream?to=${email}`
    );

    eventSource.onmessage = async (event) => {
      // Use the functional update to ensure all notifications are included
      let content = JSON.parse(event.data);

      const user = await getUser(content.owner);
      content["ownername"] = user.firstname + " " + user.lastname;

      setNotifications((prevNotifications) => [...prevNotifications, content]); // All past notification
      setNewNotifications(content); // Popup when arrived-notification
      setCount((prevCount) => prevCount + 1); // Count unread notification
      updateNotificationCount((prevCount) => prevCount + 1); // Update the count in HeaderComponent
      setNewNotification(1); // Trigger new popup notification
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (lock) {
      return;
    }
    setLock(true);
    getAllNotifications()
      .then((response) => successfulResponse(response.data))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Notifications Loaded"));

    async function successfulResponse(content) {
      if (content.length > 0) {
        const updatedContent = await Promise.all(
          content.map(async (item) => {
            const user = await getUser(item.owner);
            item.ownername = user.firstname + " " + user.lastname;
            return item; // Return the updated content
          })
        );

        setNotifications(updatedContent);

        // Count the number of unread notifications
        const unreadCount = updatedContent.filter(
          (notification) => notification.status === "unread"
        ).length;
        setCount(unreadCount);
        updateNotificationCount(unreadCount);
      }
    }

    function errorResponse(error) {
      console.log(error);
    }
  }, []);

  const resetCount = () => {
    setCount(0); // Reset the count to 0
  };

  function successfulResponse(response) {
    // console.log("successful. here's data " + JSON.stringify(response.data));
  }

  function errorResponse(error) {
    // console.log(error);
  }

  async function getUser(email) {
    try {
      const response = await getUserName(email);
      successfulResponse(response);
      return response.data;
    } catch (error) {
      errorResponse(error);
    }
  }

  const refreshNotification = async () => {
    getAllNotifications()
      .then((response) => successfulResponse(response.data))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Notifications Loaded"));

    async function successfulResponse(content) {
      if (content.length > 0) {
        const updatedContent = await Promise.all(
          content.map(async (item) => {
            const user = await getUser(item.owner);
            item.ownername = user.firstname + " " + user.lastname;
            return item; // Return the updated content
          })
        );
        setNotifications(updatedContent);
      } else {
        setNotifications([]);
      }
    }

    function errorResponse(error) {
      console.log(error);
    }
  };

  // Update friend details after successfully adding a friend    await callGetAllFriendsByIdApi();
  // This will update both friends and friend details
  async function handleAcceptFriendRequest(senderEmail) {
    try {
      console.log("s" + senderEmail);
      const response = await addFriend(senderEmail);
      successfulFriendRequestResponse(response);
      setFriends((prevFriends) => [...prevFriends, senderEmail]);
    } catch (error) {
      errorResponse(error);
    } finally {
      console.log("Map API cleanup");
    }
  }

  // Reject the friend request (With the sender's email)
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

  const acceptEventRequestApi = async (
    key,
    owner,
    member,
    title,
    date,
    time,
    description,
    invites,
    notify,
    type,
    status
  ) => {
    if (eventLock) {
      return;
    }
    setEventLock(true);
    try {
      // Wait for the pushEvent and scheduleInviteNotification to complete
      await pushEvent(
        key,
        owner,
        title,
        date,
        time,
        description,
        invites,
        notify,
        type
      ) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));

      await scheduleInviteNotification(
        key,
        owner,
        title,
        date,
        time,
        description,
        invites,
        notify,
        type,
        status
      ) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));

      await eventInviteNotification(
        key,
        owner,
        member,
        title,
        date,
        time,
        description,
        invites,
        notify,
        type + "-" + "accepted",
        status
      ) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      await refreshNotification();
    }
    setEventLock(false);
  };

  const rejectEventRequestApi = async (
    key,
    owner,
    member,
    title,
    date,
    time,
    description,
    invites,
    notify,
    type,
    status
  ) => {
    if (eventLock) {
      return;
    }
    setEventLock(true);
    try {
      await eventInviteNotification(
        key,
        owner,
        member,
        title,
        date,
        time,
        description,
        invites,
        notify,
        type + "-" + "rejected",
        status
      ) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      await refreshNotification();
    }
    setEventLock(false);
  };

  const acceptFriendRequestApi = async (
    key,
    owner,
    member,
    title,
    date,
    time,
    description,
    invites,
    notify,
    type,
    status
  ) => {
    if (friendLock) {
      return;
    }
    setFriendLock(true);
    handleAcceptFriendRequest(owner);
    try {
      await friendRequest(owner, notify, type + "-" + "accepted", status) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      await refreshNotification();
    }
    setFriendLock(false);
  };

  const rejectFriendRequestApi = async (
    key,
    owner,
    member,
    title,
    date,
    time,
    description,
    invites,
    notify,
    type,
    status
  ) => {
    if (friendLock) {
      return;
    }
    setFriendLock(true);
    handleRejectFriendRequest(owner);
    try {
      await friendRequest(owner, notify, type + "-" + "rejected", status) // Pass the parameters to the API function
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      await refreshNotification();
    }
    setFriendLock(false);
  };

  return (
    <>
      <ToastContainer
        className="p-3"
        // position="top-end"
        style={{ zIndex: 1, top: 40, right: 0, height: "100px" }}
      >
        {[newNotifications]
          .reverse()
          .filter(
            (newNotifications) =>
              newNotifications.type === "event-request" ||
              newNotifications.type === "friend-request" ||
              newNotifications.type === "event"
          )
          .map((notification, index) => (
            <Toast
              onClose={() => setNewNotification(false)}
              show={newNotification}
              delay={3000}
              autohide
            >
              <>
                {notification.type === "event-request" ? (
                  <>
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="me-auto">Event Invite</strong>
                      <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>
                      <b>
                        You've been invited by {notification.ownername} to{" "}
                        {notification.title}!
                      </b>
                      <br />
                      Date: {notification.date}
                      <br />
                      Time: {notification.time}
                      <br />
                      Notify: {notification.notify}
                    </Toast.Body>
                  </>
                ) : notification.type === "friend-request" ? (
                  <>
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="me-auto">Friend Request</strong>
                      <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>
                      <b>
                        {notification.ownername} have sent you a friend request
                      </b>
                    </Toast.Body>
                  </>
                ) : (
                  <>
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="me-auto">
                        Event: {notification.title}
                      </strong>
                      <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>
                      Date: {notification.date}
                      <br />
                      Time: {notification.time}
                      <br />
                      Notify: {notification.notify}
                    </Toast.Body>
                  </>
                )}
              </>
            </Toast>
          ))}
      </ToastContainer>

      <ToastContainer
        className="p-3"
        style={{ zIndex: 1, top: 40, right: 0, height: "100px" }}
      >
        <Toast
          onClose={() => {
            onClose();
            resetCount();
          }}
          show={isOpen}
          animation={false}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">
              Notification{" "}
              <Badge pill variant="primary">
                {count}
              </Badge>
            </strong>
            <small></small>
          </Toast.Header>
          <Toast.Body style={{ height: "650px", overflowY: "scroll" }}>
            <ListGroup variant="flush">
              {[...notifications].reverse().map((notification, index) => (
                <ListGroup.Item
                  as={Row}
                  key={index}
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                  }}
                >
                  {notification.type === "event-request" ? (
                    <>
                      <Col sm="9">
                        <div className="notification-text">
                          <b>
                            You've been invited by {notification.ownername} to{" "}
                            {notification.title}!
                          </b>
                          <br />
                          Date: {notification.date}
                          <br />
                          Time: {notification.time}
                          <br />
                          Notify: {notification.notify}
                        </div>
                      </Col>
                      <Col sm="2">
                        <div
                          onClick={() =>
                            rejectEventRequestApi(
                              notification.key,
                              notification.owner,
                              notification.member,
                              notification.title,
                              notification.date,
                              notification.time,
                              notification.description,
                              notification.invites,
                              notification.notify,
                              "event",
                              "rejected"
                            )
                          }
                        >
                          <IoCloseCircleOutline
                            style={{ fontSize: "34px", color: "#e7202e" }}
                          />
                        </div>
                      </Col>
                      <Col sm="2" className="p-0">
                        <div
                          onClick={() =>
                            acceptEventRequestApi(
                              notification.key,
                              notification.owner,
                              notification.member,
                              notification.title,
                              notification.date,
                              notification.time,
                              notification.description,
                              notification.invites,
                              notification.notify,
                              "event",
                              "accepted"
                            )
                          }
                        >
                          <IoCheckmarkCircleOutline
                            style={{ fontSize: "34px", color: "#3db04a" }}
                          />
                        </div>
                      </Col>
                    </>
                  ) : notification.type === "event-accepted" ? (
                    <>
                      <Col sm="9">
                        <div className="notification-text">
                          <b>
                            You've accepted the invite by{" "}
                            {notification.ownername} to {notification.title}!
                          </b>
                          <br />
                          Date: {notification.date}
                          <br />
                          Time: {notification.time}
                          <br />
                          Notify: {notification.notify}
                        </div>
                      </Col>
                    </>
                  ) : notification.type === "event-rejected" ? (
                    <>
                      <Col sm="9">
                        <div className="notification-text">
                          <b>
                            You've rejected the invite by{" "}
                            {notification.ownername} to {notification.title}!
                          </b>
                          <br />
                          Date: {notification.date}
                          <br />
                          Time: {notification.time}
                          <br />
                          Notify: {notification.notify}
                        </div>
                      </Col>
                    </>
                  ) : notification.type === "friend-request" ? (
                    <>
                      <Col sm="9">
                        <div className="notification-text">
                          <b>
                            {notification.ownername} have sent you a friend
                            request
                          </b>
                        </div>
                      </Col>
                      <Col sm="2">
                        <div
                          onClick={() =>
                            rejectFriendRequestApi(
                              notification.key,
                              notification.owner,
                              notification.member,
                              notification.title,
                              notification.date,
                              notification.time,
                              notification.description,
                              notification.invites,
                              notification.notify,
                              "friend",
                              "rejected"
                            )
                          }
                        >
                          <IoCloseCircleOutline
                            style={{ fontSize: "34px", color: "#e7202e" }}
                          />
                        </div>
                      </Col>
                      <Col sm="2" className="p-0">
                        <div
                          onClick={() =>
                            acceptFriendRequestApi(
                              notification.key,
                              notification.owner,
                              notification.member,
                              notification.title,
                              notification.date,
                              notification.time,
                              notification.description,
                              notification.invites,
                              notification.notify,
                              "friend",
                              "accepted"
                            )
                          }
                        >
                          <IoCheckmarkCircleOutline
                            style={{ fontSize: "34px", color: "#3db04a" }}
                          />
                        </div>
                      </Col>
                    </>
                  ) : notification.type === "friend-accepted" ? (
                    <Col sm="9">
                      <div className="notification-text">
                        <b>{notification.ownername} is now your friend</b>
                      </div>
                    </Col>
                  ) : notification.type === "friend-rejected" ? (
                    <Col sm="9">
                      <div className="notification-text">
                        <b>
                          {notification.ownername} have sent you a friend
                          request
                        </b>
                      </div>
                    </Col>
                  ) : (
                    <Col sm="9">
                      <div className="notification-text">
                        <b>
                          {notification.title} by {notification.ownername}
                        </b>
                        <br />
                        Date: {notification.date}
                        <br />
                        Time: {notification.time}
                        <br />
                        Notify: {notification.notify}
                      </div>
                    </Col>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Notification;
