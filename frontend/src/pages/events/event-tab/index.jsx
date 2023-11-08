import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { IoNotifications } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import { EventModal } from "../event-modal";

import Notification from "../notification";

import { readAllNotifications } from "../../../api/notification/NotificationApiService";

import { getAllEvents, getUserName } from "../../../api/notification/EventApiService";
import { getAllParty } from "../../../api/notification/EventApiService";

const EventComponent = ({ updateEvent, updateParty }) => {
  const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const parties = [];

  function successfulResponse(response) {
    // console.log("successful. here's data " + JSON.stringify(response.data));
  }

  function errorResponse(error) {
    console.log(error);
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

  async function fetchEvent() {
    try {
      const response = await getAllEvents();
      const content = response.data;

      const updatedContent = await Promise.all(
        content.map(async (item) => {
          const user = await getUser(item.owner);
          item.ownername = user.firstname + " " + user.lastname;

          const invitees = item.invites.split(",").map((invite) => invite.trim());

          const inviteePromises = invitees.map(async (invite) => {
            const user = await getUser(invite);
            return { email: invite, name: user.firstname + " " + user.lastname };
          });

          const inviteeData = await Promise.all(inviteePromises);

          item.invitation = inviteeData;

          return item; // Return the updated content
        })
      )

      const promises = content.map((event) => fetchParty(event.key));
      const parties = await Promise.all(promises);

      const uniquePartyMap = new Map();
      parties.forEach((party) => {
        party.forEach((item) => {
          uniquePartyMap.set(item.id, item);
        });
      });
      const uniquePartyArray = Array.from(uniquePartyMap.values());
      updateEvent(updatedContent);
      updateParty(uniquePartyArray);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function fetchParty(key) {
    try{

    const response = await getAllParty(key);
    const content = response.data;

    const updatedContent = await Promise.all(
      content.map(async (item) => {
        const user = await getUser(item.member);
        item.membername = user.firstname + " " + user.lastname;
        return item;
      })
    );

    return updatedContent;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const openNotification = () => {
    setNotificationOpen(true);
    setNotificationCount(0);
    readAllNotifications()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("read"));
    fetchEvent();
  };

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationCount(0);
    readAllNotifications()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("read"));
    fetchEvent();
  };

  const openModal = () => {
    setModalOpen(true);
    fetchEvent();
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ flexWrap: "nowrap" }}>
          <Navbar.Brand
            style={{ width: "50%", fontWeight: "bold", fontSize: "34px" }}
          >
            Events
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              width: "50%",
              flexDirection: "row-reverse",
              flexWrap: "nowrap",
              gap: "10px",
            }}
          >
            <Link className="nav-link me-4" onClick={openModal}>
              <IoAddCircle
                style={{
                  fontSize: "30px",
                  fill: "#000000",
                  fillOpacity: "54%",
                }}
              />
            </Link>
            <Link className="nav-link" onClick={openNotification}>
              <IoNotifications
                style={{
                  fontSize: "30px",
                  fill: "#000000",
                  fillOpacity: "54%",
                }}
              />{" "}
              <Badge pill variant="primary">
                {notificationCount}
              </Badge>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      <Notification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        updateNotificationCount={(count) => setNotificationCount(count)}
      />
      <EventModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default EventComponent;
