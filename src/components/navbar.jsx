import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import UserService from '../services/userService';
import '../styles/components/navbar.css';
import { ThemeContext } from '../context/Theme';

function AppNavbar() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar bg={theme === 'light' ? 'green' : 'dark'} variant={theme} expand="lg">
      <Container>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Button onClick={toggleTheme}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
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
