import React, { useState } from "react";
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

export const EventComponent = () => {
    const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

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
    };

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
                <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '34px' }}>Events</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Link className="nav-link me-4" onClick={openNotification}>
                    <IoNotifications style={{ fontSize: '24px', fill: "#000000", fillOpacity: "54%" }}/> <Badge pill variant="primary">{notificationCount}</Badge>
                </Link>
                <Link className="nav-link" onClick={openModal}>
                    <IoAddCircle style={{ fontSize: '30px', fill: "#000000", fillOpacity: "54%" }}/>
                </Link>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Outlet />  
        <Notification isOpen={isNotificationOpen} onClose={closeNotification} updateNotificationCount={(count) => setNotificationCount(count)}/>
        <EventModal isOpen={isModalOpen} onClose={closeModal}/>
        </>    
    )
}