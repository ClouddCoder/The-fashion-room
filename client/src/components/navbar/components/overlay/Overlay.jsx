import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NavbarLinks from "../navbar-links/NavbarLinks";
import NavbarProfileLinks from "../navbar-profile-links/NavbarProfileLinks";
import "./Overlay.css";

function Overlay({ newClassName, setToggle }) {
  return (
    <div className={newClassName}>
      <IconButton
        sx={{ position: "absolute", top: "20px", right: "20px" }}
        onClick={() => setToggle(false)}
      >
        <CloseIcon sx={{ width: "40px", height: "40px" }} />
      </IconButton>
      <NavbarLinks newSelector="header__navbar__overlay-links" />
      <NavbarProfileLinks newSelector="header__navbar__overlay-profile-links" />
    </div>
  );
}

export default Overlay;
