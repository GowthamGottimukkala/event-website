import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import NavBar from '../NavBar/NavBar';

const Header = (props) => {
    return (
        <header className="d-flex justify-content-end w-100 my-header">
            <nav className="navbar navbar-expand-sm navbar-dark">
                {/* <NavLink to='' className="navbar-brand">Event Buzz</NavLink> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <NavBar
                    user={props.user}
                    handleLogout={props.handleLogout}
                />
                </div>
            </nav>
        </header>

    );
};

export default Header;