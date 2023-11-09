import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import uniqid from "uniqid";

import { scheduleNotification } from "../../../api/notification/NotificationApiService";
import { createEvent } from "../../../api/notification/EventApiService";
import { getUserName } from "../../../api/notification/EventApiService";

export const EventModal = ({ isOpen, onClose }) => {
  const [inviteValue, setInviteValue] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [invites, setInvites] = useState([]);
  const [invitees, setInvitees] = useState([]);
  const [notify, setNotify] = useState(false);
  const [lock, setLock] = useState(false);

  function successfulResponse(response) {
    // console.log("successful. here's data " + response.data);
  }

  function errorResponse(error) {
    // console.log(error);
  }

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
      const email = localStorage.getItem("email");
      const newUser = inviteValue.trim();

      if (newUser && !invites.includes(newUser) && newUser != email) {
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
        "event"
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
        "event"
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

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={onClose}
      >
        <Form onSubmit={createEventApi}>
          <Modal.Header className="pt-2 pb-0" style={{ display: "block" }}>
            <Modal.Title>
              <Form.Group as={Row} className="mt-3" controlId="formTitle">
                <Col xs="10">
                  <Form.Control
                    type="text"
                    aria-label="formTitle"
                    placeholder="New Event"
                    style={{ border: "none", fontSize: 24 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
                <Form.Label column xs="2">
                  <IoPencil style={{ fontSize: "28px", float: "right" }} />
                </Form.Label>
              </Form.Group>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="formDate">
              <Form.Label column sm="2">
                Date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  aria-label="formDate"
                  placeholder="Enter date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTime">
              <Form.Label column sm="2">
                Time
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="time"
                  aria-label="formTime"
                  placeholder="Enter time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
            <Button variant="secondary" onClick={onClose}>
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
