import 'bootstrap/dist/css/bootstrap.min.css';

import Avatar from '@mui/material/Avatar';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="stickyNavbar" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">Simplify Papers</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 mr-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <NavDropdown
            className="m-2"
            title="Profile"
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
          </NavDropdown>
          <Avatar className="m-2">P</Avatar>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
