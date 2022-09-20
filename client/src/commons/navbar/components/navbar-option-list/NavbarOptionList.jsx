import React from "react";
import { Link } from "react-router-dom";
import style from "./NavbarOptionList.module.css";

function NavBarOptionList({ displayMode }) {
  return (
    <>
      {displayMode ? (
        <ul className={style.navbarMobileLinks}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      ) : (
        <ul className={style.navbarDesktopLinks}>
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
