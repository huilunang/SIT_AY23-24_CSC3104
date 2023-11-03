import React, { useState, useEffect } from 'react';
import { EventComponent } from "./event-tab";

import { getAllEvents } from "../../api/notification/EventApiService";
import { getAllParty } from "../../api/notification/EventApiService";

import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

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

  // import { friendRequest } from "../../../api/notification/NotificationApiService";
  // async function friendRequestApi() {
  //     try {
  //         await friendRequest("<receipent>", "false", "friend-request", "requested")
  //             .then((response) => successfulResponse(response))
  //             .catch((error) => errorResponse(error))
  //             .finally(() => console.log("cleanup"));
  //         } catch (error) {
  //         console.error("An error occurred:", error);
  //     }
  // }  

  useEffect(() =>{
    getAllEvents()
      .then((response) => successfulResponse(response.data))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Current Event Loaded"));

    async function successfulResponse(content) { 
      await setEvents(content);
  
      const partyPromises = content.map((event) => getParty(event.key));

      await Promise.all(partyPromises); // Wait for all getParty calls to complete
    }

    function errorResponse(error) {
      console.log(error);
    }
  }, []);

  const getParty = async (key) => {
    try {  
      const response = await getAllParty(key);
      const content = response.data;
      setParties((prevParties) => [...prevParties, ...content]);
      console.log(content)
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle errors as needed
    }
  };

  return (
    <>
    { EventComponent() }
    {[...events].reverse().map((event, index) => (
      <Card as={Row} key={index} style={{width: '100%'}}>
        <Card.Body className="ps-5 pe-5">
          <Row>
            <Col sm="10">
              <Card.Title style={{ fontSize: '36px' }}>{event.title}</Card.Title>
              <Card.Text>
            <>
              Creator: {event.owner}<br />
              Date: {event.date}<br />
              Time: {event.time}<br />
              Description: {event.description}<br />
              Party: {event.invites}
              <br />
              Accepted:&nbsp;
              {parties
                .filter((party) => event.key === party.key)
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
