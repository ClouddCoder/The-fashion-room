import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";
import Divider from "@mui/material/Divider";
import NavBarOptionList from "./components/navbar-option-list/NavbarOptionList";
import NavbarProfileList from "./components/navbar-profile-list/NavbarProfileList";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
  const [toggle, setToggle] = useState(false);
  let title;
  let displayPhone;

  // Si el tamaño de la pantalla es menor a 700px, el titulo cambia y se muestra el boton que
  // despliega el menu.
  if (useMediaQuery("(min-width:700px)")) {
    title = "The Fashion room";
    displayPhone = false;
  } else {
    title = "TFR";
    displayPhone = true;
  }

  return (
    <nav className="navbar">
      {displayPhone ? (
        <div className="navbarSmallscreen">
          <div className="navbarSmallCreenToggleButton" onClick={() => setToggle(true)}>
            <MenuIcon sx={{ width: "40px", height: "40px" }} />
          </div>
          {toggle ? (
            <div className="navbarSmallscreenOverlay">
              <div
                className="navbarSmallScreenOverlayCloseButton"
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </div>
              <NavBarOptionList displayMode={true} />
              <NavbarProfileList displayMode={true} />
            </div>
          ) : (
            <div className="navbarSmallscreenHideOverlay">
              <div
                className="navbarSmallScreenOverlayCloseButton"
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </div>
              <NavBarOptionList displayMode={true} />
              <NavbarProfileList displayMode={true} />
            </div>
          )}
          <div className="navbarTitle">
            <h1>{title}</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="navbarTitle">
            <h1>{title}</h1>
          </div>
          <NavBarOptionList displayMode={false} />
          <NavbarProfileList displayMode={false} />
        </>
      )}
    </nav>
  );
}

export default Navbar;
