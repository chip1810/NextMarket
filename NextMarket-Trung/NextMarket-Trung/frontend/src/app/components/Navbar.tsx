// src/components/Navbar.tsx
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {registerUser, loginUser} from "../services/authService";
const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/">
          EveryMark
        </Navbar.Brand>

        {/* Toggle cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu links */}
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/auth">
              Register
            </Nav.Link>
             <Nav.Link as={NavLink} to="/auth">
              Login 
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
