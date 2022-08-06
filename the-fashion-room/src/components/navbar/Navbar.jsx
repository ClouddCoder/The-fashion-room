import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="navbarTitle">The fashion room</div>
        <ul className="navbarLinks">
          <li className="link">
            <Link to="#">Home</Link>
          </li>
          <li className="link">
            <Link to="/#">About</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="navbarLogin">
          <Link to="/login">Login</Link>
          <div />
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
