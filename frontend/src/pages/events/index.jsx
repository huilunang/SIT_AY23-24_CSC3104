import React, { useState, useEffect } from "react";

import EventComponent from "./event-tab";

import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import CustomNavbar from "../../components/navbar";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [parties, setParties] = useState([]);

  function isAccepted(key, invitee) {
    // Check if invitee exists in the parties array with membername
    return parties.some((party) => key === party.key && party.member === invitee.email);
  }
    
  function getMemberName(key, invitee) {
    const matchingParty = parties.find((party) => key === party.key && party.member === invitee.email);
    return matchingParty ? matchingParty.membername : invitee.name;
  }

  return (
    <>
      <CustomNavbar />
      <EventComponent
        updateEvent={(event) => setEvents(event)}
        updateParty={(party) => setParties(party)}
      />
      {[...events].reverse().map((event, index) => (
        <Card as={Row} key={index} style={{ width: "100%" }}>
          <Card.Body className="ps-5 pe-5">
            <Row>
              <Col sm="10">
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
                    Description: {event.description}
                    <br />
                    Party:{" "}
                    <span
                      key={index}
                      style={{
                        color: "green",
                        // textDecoration: "underline"
                        fontWeight: 500
                      }}
                    >
                      {event.ownername}
                    </span>
                    {event.invitation.map((invitee, index) => (
                      <span
                        key={index}
                        style={{
                          color: isAccepted(event.key, invitee)
                            ? "green"
                            : "grey",
                        }}
                      >
                        , {getMemberName(event.key, invitee)}
                      </span>
                    ))}
                    <br />
                    Notify: {event.notify}
                  </>
                </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>
                  <Card.Img variant="top" src="holder.js/100px180" />
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default EventPage;
