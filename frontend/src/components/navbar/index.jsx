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
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

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
              <MDBNavbarItem style={{ marginRight: "30px" }}>
                <MDBNavbarLink href="#">
                  <MDBIcon far icon="images" /> Gallery
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  <MDBIcon fas icon="user-friends" /> Friends
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarNav className="justify-content-end">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link"
                    role="button"
                    style={{ cursor: "pointer" }} // Remove the arrow icon
                  >
                    <MDBIcon fas icon="user-alt" /> Profile
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>User Profile</MDBDropdownItem>
                    <MDBDropdownItem link>Log Out</MDBDropdownItem>
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
