import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";
import NavBarOptionList from "./components/navbar-option-list/NavbarOptionList";
import NavbarProfileList from "./components/navbar-profile-list/NavbarProfileList";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
  const [toggle, setToggle] = useState(true);

  const title = useMediaQuery("(min-width:700px)") ? "The Fashion room" : "TFR";

  console.log(toggle);
  return (
    <nav className="navbar">
      <div className="navbarSmallscreen">
        <div className="navbarSmallCreenToggleButton" onClick={() => setToggle(true)}>
          <MenuIcon sx={{ width: "40px", height: "40px" }} />
        </div>
        {toggle && (
          <div className="navbarSmallscreenOverlay displayOverlay">
            <div
              className="navbarSmallScreenOverlayCloseButton"
              onClick={(e) => setToggle(false)}
            >
              <CloseIcon sx={{ width: "40px", height: "40px" }} />
            </div>
            <ul className="navbarSmallscreenLinks">
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
        )}
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
