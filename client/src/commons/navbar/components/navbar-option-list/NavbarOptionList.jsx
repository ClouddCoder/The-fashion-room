import React from "react";
import { Link } from "react-router-dom";
import "./NavbarOptionList.css";

function NavBarOptionList({ displayMode }) {
  return (
    <>
      {displayMode ? (
        <ul className="navbarMobileLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      ) : (
        <ul className="navbarDesktopLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default NavBarOptionList;
