import React, { useState, useEffect } from 'react';

import EventComponent from "./event-tab";

import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { friendRequest } from "../../api/notification/NotificationApiService";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [parties, setParties] = useState([]);

  // useEffect(() => {
  //   getCurrentEvents()
  //     .then((response) => successfulResponse(response.data))
  //     .catch((error) => errorResponse(error))
  //     .finally(() => console.log("Current Event Loaded"));

  //   function successfulResponse(content) { 
  //     setEvents(content);
  //   }

  //   function errorResponse(error) {
  //     console.log(error);
  //   }
  // }, []);

  async function friendRequestApi() {
    try {
        await friendRequest("", "osy4uu@gmail.com", "false", "friend-request", "requested")
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanup"));
        } catch (error) {
          console.error("An error occurred:", error);
      }
  }  

  useEffect(() =>{
  }, []);

  return (
    <>
    <EventComponent updateEvent={(event) => setEvents(event)} updateParty={(party) => setParties(party)}/>
    <div className="nav-link me-4" onClick={friendRequestApi}>
      click me
    </div>
    {[...events].reverse().map((event, index) => (
      <Card as={Row} key={index} style={{width: '100%'}}>
        <Card.Body className="ps-5 pe-5">
          <Row>
            <Col sm="10">
              <Card.Title style={{ fontSize: '36px' }}>{event.title}</Card.Title>
              <Card.Text>
            <>
              Creator: {event.owner}<br />
              Date: {event.description}<br />
              Time: {event.time}<br />
              Description: {event.description}<br />
              Party: {event.invites}
              <br />
              Accepted:&nbsp;
              {parties
                .filter((party) => event.key === party.key && event.member == party.member)
                .map((party) => (
                  <span key={party.key}>
                    {party.member}&nbsp;
                  </span>
                ))
              } 
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
