import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import UserService from '../services/userService';
import '../styles/components/navbar.css';

function AppNavbar() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();

  return (
    <Navbar bg="green" variant="light" expand="lg">
      <Container>
       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {currentUser && (
            <Navbar.Text className="user">
              Current user: {currentUser.id}
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
