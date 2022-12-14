import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavbarLinks from "./components/navbar-links/NavbarLinks";
import NavbarProfileLinks from "./components/navbar-profile-links/NavbarProfileLinks";
import "./Navbar.css";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
  const [toggle, setToggle] = useState(false);
  let title;
  let smallScreen;

  // Si el tamaño de la pantalla es menor a 700px, el titulo cambia y se muestra el boton que
  // despliega el menu.
  if (useMediaQuery("(min-width:700px)")) {
    title = "The Fashion room";
    smallScreen = false;
  } else {
    title = "TFR";
    smallScreen = true;
  }

  return (
    <nav className="header__navbar">
      {smallScreen ? (
        <div className="header__navbar header__navbar--small-screen">
          <IconButton onClick={() => setToggle(true)}>
            <MenuIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
          {toggle ? (
            <div className="header__navbar__overlay">
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
              <NavbarLinks displayMode={true} />
              <NavbarProfileLinks displayMode={true} />
            </div>
          ) : (
            <div className="header__navbar header__navbar__overlay--hidden">
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px" }}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </IconButton>
              <NavbarLinks displayMode={true} />
              <NavbarProfileLinks displayMode={true} />
            </div>
          )}
          <div className="header__navbar__title">
            <h1>{title}</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="header__navbar__title">
            <h1>{title}</h1>
          </div>
          <NavbarLinks displayMode={false} />
          <NavbarProfileLinks displayMode={false} />
        </>
      )}
    </nav>
  );
}

export default Navbar;