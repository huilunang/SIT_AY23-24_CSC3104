import React, { useState } from "react";
import "./style.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

import { useAuth } from "../../security/AuthContext";
import NotificationComponent from "../../pages/events/notification-nav"

export default function CustomNavbar() {
  const [showBasic, setShowBasic] = useState(false);

  const authContext = useAuth();

  const logout = authContext.logout;

  return (
    <div style={{ padding: "20px" }}>
      <MDBNavbar expand="lg" light bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <img
              src="https://static.vecteezy.com/system/resources/previews/008/381/722/original/cute-bubble-milk-tea-isolated-on-white-background-hand-drawn-illustration-in-doodle-style-perfect-for-cards-decorations-logo-vector.jpg"
              alt=""
              className="mr-2"
              style={{ width: "50px", height: "50px" }}
            />
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="nav-item-space">
                <MDBNavbarLink href="/gallery">
                  <MDBIcon far icon="images" /> Gallery
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-item-space">
                <MDBNavbarLink href="/friends">
                  <MDBIcon fas icon="user-friends" /> Friends
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-item-space">
                <MDBNavbarLink href="/events">
                  <MDBIcon fas icon="calendar" /> Events
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/randomizer">
                  <MDBIcon far icon="compass" /> Randomizer
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav className="justify-content-end">
              <MDBNavbarItem className="nav-item-space">
                <NotificationComponent/>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link"
                    role="button"
                    style={{ cursor: "pointer" }} // Remove the arrow icon
                  >
                    <MDBIcon fas icon="user-alt" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBNavbarLink href="/profile">
                        <MDBIcon fas icon="user-circle" />
                        <span style={{ marginRight: "10px" }} />
                        Profile
                      </MDBNavbarLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBNavbarLink onClick={logout}>
                        <MDBIcon fas icon="sign-in-alt" />
                        <span style={{ marginRight: "10px" }} />
                        Log Out
                      </MDBNavbarLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
