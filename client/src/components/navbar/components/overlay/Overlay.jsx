import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NavbarLinks from "../navbar-links/NavbarLinks";
import NavbarProfileLinks from "../navbar-profile-links/NavbarProfileLinks";
import "./Overlay.css";

/**
 * Component for the overlay that appears when the navbar is toggled.
 * @param {Object} { newClassName, setToggle} - The new class name for the overlay
                                                and the function to toggle the navbar.
 * @returns {JSX.Element} - The JSX for the overlay.
 */
function Overlay({ newClassName, setToggle }) {
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
    </div>
  );
}

export default Overlay;
