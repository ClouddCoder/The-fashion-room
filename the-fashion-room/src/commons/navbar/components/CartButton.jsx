import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";
import { cartButtonStyle } from "../../../MUI-themes/Themes";

function CartButton() {
  return (
    <>
      <IconButton sx={cartButtonStyle} component={Link} to="/cart">
        <p>Mi carrito</p>
        <ShoppingCartOutlinedIcon />
      </IconButton>
    </>
  );
}

export default CartButton;
