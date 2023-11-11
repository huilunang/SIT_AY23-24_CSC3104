import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import uniqid from "uniqid";

import { scheduleNotification } from "../../../api/notification/NotificationApiService";
import { createEvent } from "../../../api/notification/EventApiService";
import { getUserName } from "../../../api/notification/EventApiService";
import { getDetails } from "../../../api/notification/EventApiService";
import { checkIfFriend } from "../../../api/friends/FriendsApiService";

export const EventModal = ({ isOpen, onClose, businessId }) => {
  const [details, setDetails] = useState([]);
  const [inviteValue, setInviteValue] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [invites, setInvites] = useState([]);
  const [invitees, setInvitees] = useState([]);
  const [url, setUrl] = useState("");
  const [dest, setDest] = useState("");
  const [notify, setNotify] = useState(false);

  const [validated, setValidated] = useState(false);
  const [lock, setLock] = useState(false);
  const email = localStorage.getItem("email");

  function successfulResponse(response) {
    // console.log("successful. here's data " + response.data);
  }

  function errorResponse(error) {
    // console.log(error);
  }

  // check if the (emailToCheck) is part of the user's friends
  const handleCheckFriend = async (email) => {
    try {
      const response = await checkIfFriend(email);
      return response.data; // Assuming the API returns relevant data
    } catch (error) {
      console.error('Error checking friend:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(businessId);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [businessId]);

  useEffect(() => {
    setDest(details.Name + " | " + details.Address);
    setUrl(details["Image URL"]);
  }, [details]);

  async function getUser(email) {
    try {
      const response = await getUserName(email);
      successfulResponse(response);
      return response.data;
    } catch (error) {
      errorResponse(error);
    }
  }

  const handleInviteChange = (e) => {
    setInviteValue(e.target.value);
  };

  const handleInviteKeyDown = async (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newUser = inviteValue.trim();
      const isFriend = await handleCheckFriend(newUser);
      if (newUser && !invites.includes(newUser) && newUser != email  && isFriend) {
        setInvites([...invites, newUser]);

        const user = await getUser(newUser);
        
        if (user) {
          setInvitees([...invitees, user.firstname + " " + user.lastname]);
        } else {
          setInvitees([...invitees, newUser]);
        }

        setInviteValue("");
      }
    }
  };

  const handleRemoveUser = (user) => {
    const inviteesIndex = invitees.findIndex((name) => name === user);

    // Remove the user from invitees (user name) array
    const updatedInvitees = [
      ...invitees.slice(0, inviteesIndex),
      ...invitees.slice(inviteesIndex + 1),
    ];
    setInvitees(updatedInvitees);

    // Remove the corresponding user email from invites (user email) array
    const updatedInvites = [
      ...invites.slice(0, inviteesIndex),
      ...invites.slice(inviteesIndex + 1),
    ];
    setInvites(updatedInvites);
  };

  let uniqueid = uniqid();
  async function createEventApi(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else{

      e.preventDefault();
      if (lock) {
        return;
      }
      setLock(true);
      try {
        // Wait for the pushEvent and scheduleInviteNotification to complete
        uniqueid = uniqid();
        await createEvent(
          uniqueid,
          title,
          date,
          time,
          description,
          invites,
          notify,
          "event",
          url,
          dest
        ) // Pass the parameters to the API function
          .then((response) => successfulResponse(response))
          .catch((error) => errorResponse(error))
          .finally(() => console.log("cleanup"));

        await scheduleNotification(
          uniqueid,
          title,
          date,
          time,
          description,
          invites,
          notify,
          "event",
          url,
          dest
        ) // Pass the parameters to the API function
          .then((response) => successfulResponse(response))
          .catch((error) => errorResponse(error))
          .finally(() => setLock(false));

        // After both operations have completed, close the modal
        onClose();
      } catch (error) {
        console.error("An error occurred:", error);
        setLock(false);
        // Handle errors as needed
      }
    }
    setValidated(true);
  }

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={onClose}
      >
        <Form noValidate validated={validated} onSubmit={createEventApi}>
          <Modal.Header className="pt-2 pb-0" style={{ display: "block" }}>
            <Modal.Title>
              <Form.Group as={Row} className="mt-3" controlId="formTitle">
                <InputGroup hasValidation>
                  <Col xs="10">
                    <Form.Control
                      type="text"
                      required
                      aria-label="formTitle"
                      placeholder="New Event"
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        fontSize: 24,
                      }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoComplete="off"
                    />
                  </Col>
                  <Form.Label column xs="2">
                    <IoPencil style={{ fontSize: "28px", float: "right" }} />
                  </Form.Label>
                </InputGroup>
              </Form.Group>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="formDate">
              <InputGroup hasValidation>
                <Form.Label column sm="2">
                  Date
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    required
                    aria-label="formDate"
                    placeholder="Enter date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Col>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTime">
              <InputGroup hasValidation>
                <Form.Label column sm="2">
                  Time
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="time"
                    required
                    aria-label="formTime"
                    placeholder="Enter time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Col>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDest">
              <Form.Label column sm="2">
                Venue
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  aria-label="formDest"
                  placeholder=""
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formDescription">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  aria-label="formDescription"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formInvites">
              <Form.Label column sm="2">
                Invites
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  aria-label="formInvites"
                  placeholder="Enter user (separated by commas or newlines)"
                  value={inviteValue}
                  onChange={handleInviteChange}
                  onKeyDown={handleInviteKeyDown}
                />
              </Col>
              <div className="mt-3">
                {invitees.map((user) => (
                  <span
                    key={user}
                    className="user-tag"
                    style={{ display: "inline-block" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#BEFFC5",
                        border: "1px solid #a1a3a4",
                        borderRadius: "15px",
                        width: "100%",
                      }}
                    >
                      <div className="p-1 ms-2">
                        <span style={{ fontWeight: "500" }}>{user}</span>
                        <span
                          className="me-1 remove-button"
                          onClick={() => handleRemoveUser(user)}
                        >
                          <IoClose
                            style={{
                              fontSize: "24px",
                              float: "right",
                              fill: "#000",
                              fillOpacity: "54%",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </span>
                ))}
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formNotify">
              <Form.Label column xs="2">
                Notify Email
              </Form.Label>
              <Col xs="10">
                <Form.Check
                  type="checkbox"
                  aria-label="formNotify"
                  checked={notify}
                  onChange={(e) => setNotify(e.target.checked)}
                />
                <Form.Text className="text-muted" aria-label="formNotify">
                  Send an email notification to everyone.
                </Form.Text>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose} disabled={lock}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={lock}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
