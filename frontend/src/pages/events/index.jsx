import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import EventComponent from "./event-tab";

import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

import { deleteNotification } from "../../api/notification/NotificationApiService";
import { deleteEvent } from "../../api/notification/EventApiService";

import CustomNavbar from "../../components/navbar";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [parties, setParties] = useState([]);

  const [pageRefresh, setPageRefresh] = useState(false);
  const [lock, setLock] = useState(false);
  const email = localStorage.getItem("email");

  function successfulResponse(response) {
    // console.log("successful. here's data " + response.data);
  }

  function errorResponse(error) {
    // console.log(error);
  }

  const onRemoveEvent = () => {
    setPageRefresh((prevRefresh) => !prevRefresh);
  };

  function isAccepted(key, invitee) {
    // Check if invitee exists in the parties array with membername
    return parties.some(
      (party) => key === party.key && party.member === invitee.email
    );
  }

  function getMemberName(key, invitee) {
    const matchingParty = parties.find(
      (party) => key === party.key && party.member === invitee.email
    );
    return matchingParty
      ? ", " + matchingParty.name
      : ", " + invitee.email;
  }

  async function removeEvent(event) {
    if (lock) {
      return;
    }
    setLock(true);
    try {
      await deleteEvent(event.key, event.type)
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
      await deleteNotification(event.key)
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("cleanup"));
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    } finally {
      setLock(false);
      onRemoveEvent();
    }
  }

  return (
    <>
      <CustomNavbar />
      <EventComponent
        updateEvent={(event) => setEvents(event)}
        updateParty={(party) => setParties(party)}
        onRemoveEvent={onRemoveEvent}
        pageRefresh={pageRefresh}
      />
      {[...events].reverse().map((event, index) => (
        <Card as={Row} key={index} style={{ width: "100%" }}>
          <Card.Body className="ps-5 pe-5">
            <Row>
              <Col sm="1"></Col>
              <Col sm="7">
                <Card.Title style={{ fontSize: "36px" }}>
                  {event.title}
                </Card.Title>
                <Card.Text>
                  <>
                    Creator: {event.ownername}
                    <br />
                    Date: {event.date}
                    <br />
                    Time: {event.time}
                    <br />
                    Venue: {event.dest}
                    <br />
                    Description: {event.description}
                    <br />
                    Party:{" "}
                    <span
                      key={index}
                      style={{
                        color: "green",
                        // textDecoration: "underline"
                        fontWeight: 500,
                      }}
                    >
                      {event.ownername}
                    </span>
                    {event.invitation.map((invitee, index) =>
                      invitee !== "" ? (
                        <span
                          key={index}
                          style={{
                            color: isAccepted(event.key, invitee)
                              ? "green"
                              : "grey",
                          }}
                        >
                          {getMemberName(event.key, invitee)}
                        </span>
                      ) : null
                    )}
                    <br />
                    Email Notification: {!event.notify ? "Off" : "On"}
                  </>
                </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>
                  <Card.Img variant="top" src={event.url} style={{ width: '30vh', height: '30vh', objectFit: 'fill' }}/>
                </Card.Text>
              </Col>
              <Col sm="1">
                {email == event.owner ? (
                  <Link
                    className="nav-link me-4"
                    onClick={() => removeEvent(event)}
                    style={{ float: "right" }}
                  >
                    <MDBIcon fas icon="trash" style={{ fontSize: "13px" }} />{" "}
                  </Link>
                ) : null}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default EventPage;
