import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import UserService from '../services/userService';
import '../styles/components/navbar.css';
import { ThemeContext } from '../context/Theme';
import { useLanguage } from '../context/LanguageContext';

function AppNavbar() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { currentLanguage, changeLanguage, translate } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'cs' : 'en';
    changeLanguage(newLanguage);
  };



  return (
    <Navbar bg={theme === 'light' ? 'green' : 'dark'} variant={theme} expand="lg">
      <Container>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">{translate('home')}</Nav.Link>
            <Button onClick={toggleTheme}>
              {theme === 'light' ? translate('dark'): translate('light')}
            </Button>
            <Button variant="secondary" onClick={toggleLanguage}>
              {currentLanguage === 'en' ? 'Čeština' : 'English'}
            </Button>
          </Nav>
          {currentUser && (
            <Navbar.Text className="user">
              {translate('current')} {translate('user')}: {currentUser.id}
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
