import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { IoNotifications } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';

import { EventModal } from "../event-modal";

import Notification from "../notification";

import { readAllNotifications } from "../../../api/notification/NotificationApiService";

import { getAllEvents } from "../../../api/notification/EventApiService";
import { getAllParty } from "../../../api/notification/EventApiService";

const EventComponent = ({ updateEvent, updateParty }) => {
    const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const getEvent = async () => {
        getAllEvents()
          .then((response) => successfulResponse(response.data))
          .catch((error) => errorResponse(error))
          .finally(() => console.log("Current Event Loaded"));
    
        async function successfulResponse(content) { 
          const partyPromises = content.map((event) => getParty(event.key));
          await Promise.all(partyPromises); // Wait for all getParty calls to complete

          updateEvent(content);
        }
    
        function errorResponse(error) {
          console.log(error);
        }
      };
    
      const getParty = async (key) => {
        try {  
          const response = await getAllParty(key);
          const content = response.data;
          updateParty([...content]); // Update the parent component's state
          console.log(content)
        } catch (error) {
          console.error("An error occurred:", error);
          // Handle errors as needed
        }
      };
      
    useEffect(() =>{
        getEvent();
    }, []);
    
    const openNotification = () => {
        setNotificationOpen(true);
    };
    
    const closeNotification = () => {
        setNotificationOpen(false);
        setNotificationCount(0);
        readAllNotifications()
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
        .finally(() => console.log("read"));

        getEvent();
    };
    
    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        getEvent();
    };

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{flexWrap:"nowrap" }}>
          <Navbar.Brand style={{ width:"50%", fontWeight: 'bold', fontSize: '34px' }}>Events</Navbar.Brand>
          <Nav className="me-auto" style={{width:"50%", flexDirection:"row-reverse", flexWrap:"nowrap" }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Link className="nav-link me-4" onClick={openModal}>
                <IoAddCircle style={{ fontSize: '30px', fill: "#000000", fillOpacity: "54%" }}/>
            </Link>            
            <Link className="nav-link" onClick={openNotification}>
                <IoNotifications style={{ fontSize: '30px', fill: "#000000", fillOpacity: "54%" }}/> <Badge pill variant="primary">{notificationCount}</Badge>
            </Link>
          </Nav>            
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Container>
        </Navbar>
        <Outlet />  
        <Notification isOpen={isNotificationOpen} onClose={closeNotification} updateNotificationCount={(count) => setNotificationCount(count)}/>
        <EventModal isOpen={isModalOpen} onClose={closeModal}/>
        </>    
    )
}

export default EventComponent;