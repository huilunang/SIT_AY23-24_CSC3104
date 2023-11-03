import React, { useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import uniqid from "uniqid";

import { scheduleNotification } from "../../../api/notification/NotificationApiService";
import { createEvent } from "../../../api/notification/EventApiService";

export const EventModal = ({ isOpen, onClose }) => {
    const [inviteValue, setInviteValue] = useState('');

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [invites, setInvites] = useState([]);
    const [notify, setNotify] = useState(false);

    const handleInviteChange = (e) => {
      setInviteValue(e.target.value);
    };
  
    const handleInviteKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const newUser = inviteValue.trim();
  
        if (newUser && !invites.includes(newUser)) {
            setInvites([...invites, newUser]);
            setInviteValue('');
        }
      }
    };
  
    const handleRemoveUser = (user) => {
      const updatedUsers = invites.filter((e) => e !== user);
      setInvites(updatedUsers);
    };

    let uniqueid = uniqid();
    async function createEventApi(e) {
        e.preventDefault();       
        try {
            // Wait for the pushEvent and scheduleInviteNotification to complete
            uniqueid = uniqid();
            await createEvent(uniqueid, title, date, time, description, invites, notify, "event") // Pass the parameters to the API function
                .then((response) => successfulResponse(response))
                .catch((error) => errorResponse(error))
                .finally(() => console.log("cleanup"));
            
            await scheduleNotification(uniqueid, title, date, time, description, invites, notify, "event") // Pass the parameters to the API function
                .then((response) => successfulResponse(response))
                .catch((error) => errorResponse(error))
                .finally(() => console.log("cleanup"));
                
            // After both operations have completed, reload the page
            window.location.reload();
            } catch (error) {
            console.error("An error occurred:", error);
            // Handle errors as needed
        }
    }  

    function successfulResponse(response) {
    //   setDescription(''); // Clear the description after a successful send
      console.log("successful. here's data " + response.data);
    }
  
    function errorResponse(error) {
      console.log(error);
    }
  
    return (
        <>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} onHide={onClose}>        
      <Form onSubmit={createEventApi}>
        <Modal.Header className="pt-2 pb-0" style={{ display: "block" }}>
          <Modal.Title>
            <Form.Group as={Row} className="mt-3" controlId="formTitle">
                <Col sm="11">
                    <Form.Control type="text" aria-label="formTitle" placeholder="New Event" style={{ border: "none", fontSize: 24 }} value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Col>
                <Form.Label column sm="1">
                    <IoPencil style={{ fontSize: '28px' }}/>
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
                        <Form.Control type="date" aria-label="formDate" placeholder="Enter date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formTime">
                    <Form.Label column sm="2">
                        Time
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="time" aria-label="formTime" placeholder="Enter time" value={time} onChange={(e) => setTime(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formDescription">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" aria-label="formDescription" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formInvites">
                    <Form.Label column sm="2">
                        Invites
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text"
                            aria-label="formInvites"
                            placeholder="Enter user (separated by commas or newlines)"
                            value={inviteValue}
                            onChange={handleInviteChange}
                            onKeyDown={handleInviteKeyDown}
                        />
                    </Col>
                    <div className="mt-3">
                        {invites.map((user) => (
                            <span key={user} className="user-tag" style={{display: "inline-block"}}>
                                <div style={{ backgroundColor: "#BEFFC5", border: "1.5px solid #A5A5A5", borderRadius: "15px", width: "100%"}}>
                                    <div className="p-1 ms-2">
                                        <span style={{ fontWeight: "500" }}>{user}</span>
                                        <span className="me-1 remove-button" onClick={() => handleRemoveUser(user)}>
                                            <IoClose style={{ fontSize: '24px', float: "right", fill: "#000000", fillOpacity: "54%"}}/>
                                        </span>
                                    </div>
                                </div>
                            </span>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formNotify">
                    <Form.Label column sm="2">
                        Notify Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Check type="checkbox" aria-label="formNotify" checked={notify} onChange={(e) => setNotify(e.target.checked)}/>
                        <Form.Text className="text-muted" aria-label="formNotify" >
                        We'll send an email notification with everyone.
                        </Form.Text>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary"  type="submit">
                    Create
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
        </>    
    )
}