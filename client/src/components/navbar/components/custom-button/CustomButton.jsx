import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { customButtonStyle } from "./CustomButtonMUIStyle.js";

/**
 * Boton personalizado para el carrito y la wishlist
 */
function CustomButton({ children, path }) {
  return (
    <IconButton sx={customButtonStyle} component={Link} to={path}>
      {children}
    </IconButton>
  );
}

export default CustomButton;
