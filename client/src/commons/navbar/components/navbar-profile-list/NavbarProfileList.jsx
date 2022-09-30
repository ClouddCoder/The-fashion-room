import React, { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import ProfileButton from "../profile-button/ProfileButton";
import CustomButton from "../custom-button/CustomButton";
import AuthContext from "../../../../context/auth-context/AuthContext";
import "./NavbarProfileList.css";

function NavbarProfileList({ displayMode }) {
  const {
    auth,
    setAuth,
    user,
    setUser,
    setToken,
    setUserId,
    setUserName,
    setUserLastname,
    setUserEmail,
    setUserPassword,
  } = useContext(AuthContext);

  const resetSession = () => {
    setAuth(false);
    setUser("");
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
        <div className="navbarMobileLogin">
          <div className="navbarUserName">
            <p>{user}</p>
          </div>
          <div className="navbarWishlistButton">
            <CustomButton title="Wishlist" path="/wishlist">
              <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="navbarCartButton">
            <CustomButton title="Mi carrito" path="/cart">
              <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="navbarProfileButton">
            <ProfileButton resetSession={resetSession} />
          </div>
        </div>
      );
    }
    return (
      <div className="navbarMobileLogin">
        <div className="navbarLoginButton">
          <Link to="/login" component="button" onClick={resetForm}>
            Login
          </Link>
        </div>
        <div className="navbarRegisterButton">
          <Link to="/register" component="button" onClick={resetForm}>
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (auth) {
    return (
      <div className="navbarDesktopLogin">
        <div className="navbarUserName">
          <p>{user}</p>
        </div>
        <div className="horizontalLine" />
        <div className="navbarWishlistButton">
          <CustomButton title="Wishlist" path="/wishlist">
            <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
          </CustomButton>
        </div>
        <div className="navbarCartButton">
          <CustomButton title="Mi carrito" path="/cart">
            <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
          </CustomButton>
        </div>
        <div className="navbarProfileButton">
          <ProfileButton resetSession={resetSession} />
        </div>
      </div>
    );
  }
  return (
    <div className="navbarDesktopLogin">
      <div className="navbarLoginButton">
        <Link to="/login" component="button" onClick={resetForm}>
          Login
        </Link>
      </div>
      <div className="horizontalLine" />
      <div className="navbarRegisterButton">
        <Link to="/register" component="button" onClick={resetForm}>
          Register
        </Link>
      </div>
    </div>
  );

  /*
  return (
    <>
      {displayMode ? (
        auth ? (
          <div className="navbarMobileLogin">
            <div className="navbarUserName">
              <p>{user}</p>
            </div>
            <div className="navbarWishlistButton">
              <CustomButton title="Wishlist" path="/wishlist">
                <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
              </CustomButton>
            </div>
            <div className="navbarCartButton">
              <CustomButton title="Mi carrito" path="/cart">
                <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
              </CustomButton>
            </div>
            <div className="navbarProfileButton">
              <ProfileButton resetSession={resetSession} />
            </div>
          </div>
        ) : (
          <div className="navbarMobileLogin">
            <div className="navbarLoginButton">
              <Link to="/login" component="button" onClick={resetForm}>
                Login
              </Link>
            </div>
            <div className="navbarRegisterButton">
              <Link to="/register" component="button" onClick={resetForm}>
                Register
              </Link>
            </div>
          </div>
        )
      ) : auth ? (
        <div className="navbarDesktopLogin">
          <div className="navbarUserName">
            <p>{user}</p>
          </div>
          <div className="horizontalLine" />
          <div className="navbarWishlistButton">
            <CustomButton title="Wishlist" path="/wishlist">
              <FavoriteBorderOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="navbarCartButton">
            <CustomButton title="Mi carrito" path="/cart">
              <ShoppingCartOutlinedIcon sx={{ ml: "10px" }} />
            </CustomButton>
          </div>
          <div className="navbarProfileButton">
            <ProfileButton resetSession={resetSession} />
          </div>
        </div>
      ) : (
        <div className="navbarDesktopLogin">
          <div className="navbarLoginButton">
            <Link to="/login" component="button" onClick={resetForm}>
              Login
            </Link>
          </div>
          <div className="horizontalLine" />
          <div className="navbarRegisterButton">
            <Link to="/register" component="button" onClick={resetForm}>
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
  */
}

export default NavbarProfileList;
