import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

const NavMenu = (props) => {
    let menu = props.user ?
    <ul className="navbar-nav ml-auto">
        {/* <span className='navbar-text'>Welcome, {props.user.name}</span> */}
        <li className='nav-item mr-4'><NavLink to='/events' className="nav-link">Home</NavLink></li>
        <li className='nav-item dropdown mr-4'>
            <a className='nav-link dropdown-toggle' href='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Events
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <NavLink to='/my-created-events' className='dropdown-item'>Created Events</NavLink>
            <NavLink to='/my-events' className='dropdown-item'>Booked Events</NavLink>
            </div>
        </li>
        {/* <li className='nav-item'><NavLink to='/my-events' className="nav-link">Booked-Events</NavLink></li>
        <li className='nav-item'><NavLink to='/my-created-events' className="nav-link">Created-Events</NavLink></li> */}
        <li className="nav-item mr-4">
            <Link to='events/new' className="nav-link">Create Event</Link>
        </li>
        <li className="nav-item mr-4">
            <Link to='/chatgpt' className="nav-link">Ask ChatGPT</Link>
        </li>
        <li className="nav-item mr-4">
            <Link to='logout' onClick={props.handleLogout} className="nav-link">Log Out</Link>
        </li>
    </ul>
    :
    <ul className="navbar-nav ml-auto">
        <li className='nav-item mr-4'><NavLink to='/events' className="nav-link">Home</NavLink></li>
        <li className="nav-item mr-4"><NavLink to='/login' className='nav-link'>Log In</NavLink></li>
        <li className="nav-item mr-4"><NavLink to='/signup' className='nav-link'>Sign Up</NavLink></li>
    </ul>;

    return menu;
};

export default NavMenu;