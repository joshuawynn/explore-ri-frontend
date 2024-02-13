import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../NavBar.module.css';
import logoImage from '../assets/riLogo.png';


const Header = ({ user, handleLogOut }) => {
  const userOptions = (
    <Nav>
      <Nav.Link as={NavLink} to="/feed" className={styles.navLink}>
        Feed
      </Nav.Link>
      <Nav.Link as={NavLink} to="/" onClick={handleLogOut} className={styles.navLink}>
        Sign Out
      </Nav.Link>
    </Nav>
  );

  const publicOptions = (
    <Nav>
      <Nav.Link as={NavLink} to="/register" className={styles.navLink}>
        Register
      </Nav.Link>
      <Nav.Link as={NavLink} to="/signin" className={styles.navLink}>
        Sign In
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg" className={`${styles.navbar} d-flex justify-content-center`}>
      <Container className={`d-flex justify-between ${styles.navbarContainer}`}>
        <Navbar.Brand as={NavLink} to="/" className={`${styles.navbarBrand} d-flex align-items-center`}>
       
          <img
            src={logoImage}
            width="100" // Adjust the width as needed
            height="100" // Adjust the height as needed
            className="d-inline-block align-top mr-2"
            alt="Explore RI Logo"
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/restaurants" className={styles.navLink}>
              Restaurants
            </Nav.Link>
            <Nav.Link as={NavLink} to="/destinations" className={styles.navLink}>
              Destinations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activities" className={styles.navLink}>
              Activities
            </Nav.Link>
            <Nav.Link as={NavLink} to="/addTodoForm" className={styles.navLink}>
              Add Todo
            </Nav.Link>
          </Nav>
          {user ? userOptions : publicOptions}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
