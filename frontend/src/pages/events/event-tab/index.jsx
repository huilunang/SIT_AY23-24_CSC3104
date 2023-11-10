import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { MDBIcon } from "mdb-react-ui-kit";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// import { EventModal } from "../event-modal";

import { getAllEvents } from "../../../api/notification/EventApiService";
import { getAllParty } from "../../../api/notification/EventApiService";
import { getUserName } from "../../../api/notification/EventApiService";

const EventComponent = ({
  updateEvent,
  updateParty,
  onRemoveEvent,
  pageRefresh,
}) => {
  // const [isModalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   if (businessId) {
  //     setModalOpen(true);
  //   } else {
  //     setModalOpen(false);
  //   }
  // }, [businessId]);

  function successfulResponse(response) {
    // console.log("successful. here's data " + JSON.stringify(response.data));
  }

  function errorResponse(error) {
    console.log(error);
  }

  async function getUser(email) {
    try {
      const response = await getUserName(email);
      successfulResponse(response);
      return response.data;
    } catch (error) {
      errorResponse(error);
      return;
    }
  }

  async function fetchEvent() {
    try {
      const response = await getAllEvents();
      const content = response.data;

      const updatedContent = await Promise.all(
        content.map(async (item) => {
          const user = await getUser(item.owner);
          item.ownername = user.firstname + " " + user.lastname;

          const invitees = item.invites
            .split(",")
            .map((invite) => invite.trim());
          if (invitees.length > 0) {
            const inviteePromises = invitees.map(async (invite) => {
              if (invite != "") {
                const inviteUser = await getUser(invite);
                return {
                  email: invite,
                  name: inviteUser ? `${inviteUser.firstname} ${inviteUser.lastname}` : "",
                };
              } else {
                return "";
              }
            });
            const inviteeData = await Promise.all(inviteePromises);
            item.invitation = inviteeData;
          } else {
            item.invitation = [];
          }

          return item; // Return the updated content
        })
      );

      const promises = content.map((event) => fetchParty(event.key));
      const parties = await Promise.all(promises);

      const uniquePartyMap = new Map();
      parties.forEach((party) => {
        party.forEach((item) => {
          uniquePartyMap.set(item.id, item);
        });
      });
      const uniquePartyArray = Array.from(uniquePartyMap.values());
      updateEvent(updatedContent);
      updateParty(uniquePartyArray);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function fetchParty(key) {
    try {
      const response = await getAllParty(key);
      const content = response.data;

      if (content.length > 0) {
        const updatedContent = await Promise.all(
          content.map(async (item) => {
            const user = await getUser(item.member);
            item.membername = user.firstname + " " + user.lastname;
            return item;
          })
        );

        return updatedContent;
      } else {
        // Handle the case where there are no party items
        return [];
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // const openModal = () => {
  //   setModalOpen(true);
  //   fetchEvent();
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  //   fetchEvent();
  // };

  const refreshEvents = async () => {
    await fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    if (pageRefresh) {
      refreshEvents();
      onRemoveEvent();
    }
  }, [pageRefresh, onRemoveEvent]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container style={{ flexWrap: "nowrap" }}>
          <Navbar.Brand
            style={{ width: "50%", fontWeight: "bold", fontSize: "34px" }}
          >
            Events
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              width: "50%",
              flexDirection: "row-reverse",
              flexWrap: "nowrap",
              gap: "10px",
            }}
          >
            <Link className="nav-link me-4" onClick={refreshEvents}>
              <MDBIcon fas icon="redo" style={{ fontSize: "24px" }} />{" "}
            </Link>
            {/* <Link className="nav-link me-4" onClick={openModal}>
              <MDBIcon fas icon="plus-circle" style={{ fontSize: "24px" }} />{" "}
            </Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      {/* <EventModal isOpen={isModalOpen} onClose={closeModal} /> */}
    </>
  );
};

export default EventComponent;
