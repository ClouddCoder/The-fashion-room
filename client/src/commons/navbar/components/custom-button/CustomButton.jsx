import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { customButtonStyle } from "./style";

/**
 * Boton personalizado para el carrito y la wishlist
 */
function CustomButton({ children, title, path }) {
  return (
    <>
      <IconButton sx={customButtonStyle} component={Link} to={path}>
        <p>{title}</p>
        {children}
      </IconButton>
    </>
  );
}

export default CustomButton;
