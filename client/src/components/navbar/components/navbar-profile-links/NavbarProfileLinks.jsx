import React, { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import ProfileButton from "../profile-button/ProfileButton";
import CustomButton from "../custom-button/CustomButton";
import AuthContext from "../../../../context/auth-context/AuthContext";
import "./NavbarProfileLinks.css";

function NavbarProfileLinks({ displayMode }) {
  const {
    auth,
    setAuth,
    user,
    setUser,
    setToken,
    setUserId,
    setUserName,
    setUsername,
    setUserLastname,
    setUserEmail,
    setUserPassword,
  } = useContext(AuthContext);

  const resetSession = () => {
    setAuth(false);
    setUser("");
    setUsername("");
    setToken("");
    setUserId("");
  };

  /**
   * Borra los campos del login y register cuando se redirige a uno de los dos
   */
  const resetForm = () => {
    setUserName("");
    setUserLastname("");
    setUserEmail("");
    setUserPassword("");
  };

  if (displayMode) {
    if (auth) {
      return (
        <div className="header__navbar__small-screen-user-links">
          <div className="header__navbar__username">
            <p>{user}</p>
          </div>
          <div className="header__navbar__wishlist">
            <CustomButton path="/wishlist">
              <p>Wishlist</p>
              <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="header__navbar__cart">
            <CustomButton path="/cart">
              <p>Mi carrito</p>
              <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="header__navbar__profile">
            <ProfileButton resetSession={resetSession} />
          </div>
        </div>
      );
    }
    return (
      <div className="header__navbar__small-screen-user-links">
        <div className="header__navbar__login">
          <Link to="/login" component="button" onClick={resetForm}>
            Login
          </Link>
        </div>
        <div className="header__navbar__register">
          <Link to="/register" component="button" onClick={resetForm}>
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (auth) {
    return (
      <div className="header__navbar__user-links">
        <div className="header__navbar__username">
          <p>{user}</p>
        </div>
        <div className="horizontal-line" />
        <div className="header__navbar__wishlist">
          <CustomButton path="/wishlist">
            <p>Wishlist</p>
            <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
          </CustomButton>
        </div>
        <div className="header__navbar__cart">
          <CustomButton path="/cart">
            <p>Mi carrito</p>
            <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
          </CustomButton>
        </div>
        <div className="header__navbar__profile">
          <ProfileButton resetSession={resetSession} />
        </div>
      </div>
    );
  }
  return (
    <div className="header__navbar__user-links">
      <div className="header__navbar__login">
        <Link to="/login" component="button" onClick={resetForm}>
          Login
        </Link>
      </div>
      <div className="horizontal-line" />
      <div className="header__navbar__register">
        <Link to="/register" component="button" onClick={resetForm}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default NavbarProfileLinks;
