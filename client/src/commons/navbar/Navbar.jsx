import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";
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
    <nav id="navbar">
      {displayPhone ? (
        <div className="navbarSmallscreen">
          <IconButton onClick={() => setToggle(true)}>
            <MenuIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
          {toggle ? (
            <div className="navbarSmallscreenOverlay">
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
              <NavBarOptionList displayMode={true} />
              <NavbarProfileList displayMode={true} />
            </div>
          ) : (
            <div className="navbarSmallscreenHideOverlay">
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
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
