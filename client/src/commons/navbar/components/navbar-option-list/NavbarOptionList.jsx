import React from "react";
import { Link } from "react-router-dom";
import "./NavbarOptionList.css";

function NavBarOptionList() {
  return (
    <div>
      <ul className="navbarLinks">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBarOptionList;
