import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="navbarTitle">The fashion room</div>
        <ul className="navbarLinks">
          <li className="link">
            <a href="#">Home</a>
          </li>
          <li className="link">
            <a href="/about">About</a>
          </li>
          <li className="link">
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="navbarLogin">
          <a href="/login">Login</a>
          <div />
          <a href="/register">Register</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
