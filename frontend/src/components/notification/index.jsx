import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

// Notification Components
import { IoNotifications } from "react-icons/io5";
import Badge from 'react-bootstrap/Badge';
import Notification from "../../pages/notification";
import { readAllNotifications } from "../../api/NotificationApiService";

export const NotificationComponent = () => {
    const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setNotificationCount(0);
        readAllNotifications()
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
        .finally(() => console.log("read"));
    };

    return (
        <>
            <li className="nav-item fs-5">
                <Link className="nav-link" onClick={openModal}>
                    <IoNotifications /> <Badge pill variant="primary">{notificationCount}</Badge>
                </Link>
            </li>
            <Outlet />  
            <Notification isOpen={isModalOpen} onClose={closeModal} updateNotificationCount={(count) => setNotificationCount(count)}/>
        </>    
    )
}