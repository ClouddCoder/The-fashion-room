import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import NavbarLinks from "../navbar-links/NavbarLinks";
import NavbarProfileLinks from "../navbar-profile-links/NavbarProfileLinks";
import AuthContext from "../../../../context/auth-context/AuthContext";
import ProductContext from "../../../../context/product-context/ProductContext";
import "./Overlay.css";

/**
 * Component for the overlay that appears when the navbar is toggled.
 * @param {Object} { newClassName, setToggle} - The new class name for the overlay
                                                and the function to toggle the navbar.
 * @returns {JSX.Element} - The JSX for the overlay.
 */
function Overlay({ newClassName, setToggle }) {
  const { auth, resetSession } = useContext(AuthContext);
  const { resetProductState } = useContext(ProductContext);

  return (
    <div className={newClassName}>
      <IconButton
        sx={{ position: "absolute", top: "5px", left: "5px" }}
        onClick={() => setToggle(false)}
      >
        <CloseIcon sx={{ width: "40px", height: "40px" }} />
      </IconButton>
      <NavbarProfileLinks newSelector="header__navbar__profile-links overlay-active" />
      <NavbarLinks newSelector="header__navbar__links overlay-active" />
      {
        // If the user is authenticated
        auth && (
          <div className="sign-out-container">
            <Link
              to="/"
              onClick={() => {
                resetSession();
                resetProductState();
                window.localStorage.removeItem("logged");
              }}
            >
              Salir
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default Overlay;
