import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Navbar.module.css";
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

  if (useMediaQuery("(min-width:700px)")) {
    title = "The Fashion room";
    displayPhone = false;
  } else {
    title = "TFR";
    displayPhone = true;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarSmallscreen}>
        <div className={styles.navbarSmallCreenToggleButton} onClick={() => setToggle(true)}>
          <MenuIcon sx={{ width: "40px", height: "40px" }} />
        </div>
        {displayPhone ? (
          toggle ? (
            <div className={styles.navbarSmallscreenOverlay}>
              <div
                className={styles.navbarSmallScreenOverlayCloseButton}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </div>
              <NavBarOptionList displayMode={true} />
              <NavbarProfileList displayMode={true} />
            </div>
          ) : (
            <div className={styles.navbarSmallscreenHideOverlay}>
              <div
                className={styles.navbarSmallScreenOverlayCloseButton}
                onClick={() => setToggle(false)}
              >
                <CloseIcon sx={{ width: "40px", height: "40px" }} />
              </div>
              <NavBarOptionList displayMode={true} />
              <NavbarProfileList displayMode={true} />
            </div>
          )
        ) : (
          <>
            <NavBarOptionList displayMode={false} />
            <NavbarProfileList displayMode={false} />
          </>
        )}
      </div>
      <div className={styles.navbarTitle}>
        <h1>{title}</h1>
      </div>
      {/*<NavBarOptionList displayMode={false} />*/}
      {/*<NavbarProfileList displayMode={false} />*/}
    </nav>
  );
}

export default Navbar;
