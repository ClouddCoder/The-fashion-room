import React from "react";
import { HeaderBackground } from "../../../../assets";
import "./Header.css";

/**
 * Componente que muestra el header de la tienda
 */
function Header() {
  return (
    <figure className="home-header">
      <img src={HeaderBackground} alt="The Fashion Room" />
    </figure>
  );
}

export default Header;
