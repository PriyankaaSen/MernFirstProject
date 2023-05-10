import React from 'react'
import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {signout} from '../../actions';
import img1 from '../../assets/img/userProfile.png';

const Header = () => {

  const auth = useSelector(state=> state.auth)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout())
  }

const renderLoggedInLinks = () => {
  return (
    <Nav>
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-5">
    <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         <span className='text-white m-3'>{auth.data.role}</span>
         <img className="img-profile rounded-circle" style={{height: '30px', width:'30px'}} src={img1} />
         </a>
         <ul className="dropdown-menu bg-dark ml-5 dropdown-menu-item" aria-labelledby="navbarDropdownMenuLink">
           <li><Link className="dropdown-item text-white" to="/userprofile">Profile</Link></li>
           <li><a className="dropdown-item text-white" href="#">Setting</a></li>
           <li><a className="dropdown-item text-white" onClick= {logout} >Signout</a></li>
         </ul>
       </li>

     </ul>
    </Nav>
  )
}

const renderNonLoggedInLinks = () => {
  return (
    <Nav>
      <li className="nav-item">
      <NavLink to="/signin" className="nav-link">Signin</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to ="/signup" className="nav-link">Signup</NavLink>
      </li>
    </Nav>
  );
}

    return (
        <>
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
          <Container>
            <Link to= "/" className="navbar-brand">Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
            </Navbar.Collapse>
        </Container>
  </Navbar>
        </>
    )
}

export default Header
