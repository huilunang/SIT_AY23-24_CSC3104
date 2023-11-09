import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import { MDBIcon } from "mdb-react-ui-kit";

import Notification from "../notification";

import { readAllNotifications } from "../../../api/notification/NotificationApiService";

const NotificationComponent = () => {
  const [notificationCount, setNotificationCount] = useState(0); // Initialize the count to 0
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  function successfulResponse(response) {
    // console.log("successful. here's data " + JSON.stringify(response.data));
  }

  function errorResponse(error) {
    console.log(error);
  }

  const openNotification = () => {
    setNotificationOpen(true);
    setNotificationCount(0);
    readAllNotifications()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("read"));
  };

  const closeNotification = () => {
    setNotificationOpen(false);
    setNotificationCount(0);
    readAllNotifications()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("read"));
  };

  return (
    <>
      <Link className="nav-link" onClick={openNotification} style={{display:"flex", flexDirection:"row", flexWrap:"nowrap", gap:"3px"}}>
        <MDBIcon fas icon="bell" style={{fontSize: "20px"}}/> {" "}
        <Badge pill variant="primary">
          {notificationCount}
        </Badge>
      </Link>
      {/* <Outlet/> */}
      <Notification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        updateNotificationCount={(count) => setNotificationCount(count)}
      />
    </>
  );
};

export default NotificationComponent;
