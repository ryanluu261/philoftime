import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faPlusCircle, faBars } from '@fortawesome/free-solid-svg-icons';

import { signoutUser } from '../actions';

function NavBar(props) {
  const navigate = useNavigate();
  const renderLogins = () => {
    if (props.authenticated) {
      return (
        <NavDropdown title={<FontAwesomeIcon icon={faBars} />} id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1" onClick={() => props.signoutUser(navigate)}>sign-out</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return [
        <NavLink to="/signin" key="signin-button">
          <Button variant="link" type="submit">sign-in</Button>
        </NavLink>,
        <NavLink to="/signup" key="signup-button">
          <Button variant="link" type="submit">sign-up</Button>
        </NavLink>,
      ];
    }
  };

  return (
    <Navbar bg="faded" expand="lg" className="bg-light justify-content-between">
      <Navbar.Brand><Link to="/"><FontAwesomeIcon icon={faCubes} /></Link></Navbar.Brand>
      <ButtonToolbar>
        {renderLogins()}
        <Link to="/posts/new">
          <FontAwesomeIcon icon={faPlusCircle} size="2x" />
        </Link>
      </ButtonToolbar>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { signoutUser })(NavBar);
