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

import { getAllEvents } from "../../../api/notification/EventApiService";
import { getAllParty } from "../../../api/notification/EventApiService";

const EventComponent = ({ updateEvent, updateParty }) => {
  const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const parties = [];

  async function fetchEvent() {
    try {
      const response = await getAllEvents();
      const content = response.data;
      const promises = content.map((event) => fetchParty(event.key, parties));
      await Promise.all(promises);

      const uniquePartyMap = new Map();
      parties.forEach((par) => {
        uniquePartyMap.set(par.id, par);
      });
      const uniquePartyArray = Array.from(uniquePartyMap.values());

      updateEvent(content);
      updateParty(uniquePartyArray);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function fetchParty(key, parties) {
    const response = await getAllParty(key);
    const content = response.data;
    content.forEach((item) => {
      parties.push(item);
    });
  }

  const openNotification = () => {
    setNotificationOpen(true);
    fetchEvent();
  };

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationCount(0);
    readAllNotifications()
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
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
