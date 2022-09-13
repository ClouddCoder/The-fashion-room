import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";
import NavBarOptionList from "./components/navbar-option-list/NavbarOptionList";
import NavbarProfileList from "./components/navbar-profile-list/NavbarProfileList";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
  const [toggle, setToggle] = useState(false);

  const title = useMediaQuery("(min-width:700px)") ? "The Fashion room" : "TFR";

  return (
    <nav className="navbar">
      <div className="navbarToggleButton" onClick={() => setToggle(true)}>
        <MenuIcon sx={{ width: "40px", height: "40px" }} />
        {toggle ? (
          <div className="displayMenu">
            <ul>
              <li>
                <p>Home</p>
              </li>
              <li>
                <p>About</p>
              </li>
              <li>
                <p>Contact</p>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="navbarTitle">
        <h1>{title}</h1>
      </div>
      <NavBarOptionList />
      <NavbarProfileList />
    </nav>
  );
}

export default Navbar;
