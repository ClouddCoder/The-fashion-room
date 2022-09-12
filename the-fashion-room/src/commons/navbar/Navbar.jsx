import React, { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AuthContext from "../../context/auth-context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileButton from "./components/profile-button/ProfileButton";
import CustomButton from "./components/custom-button/CustomButton";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
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

  /**
   * Borra los datos del usuario al salir de la sesion
   */
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

  return (
    <div className="header">
      <nav className="navbar">
        <div className="navbarTitle">
          <h1>The Fashion room</h1>
        </div>
        <ul className="navbarLinks">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contacto</Link>
          </li>
          {auth ? (
            <li className="orders">
              <Link to="/orders">Mis compras</Link>
            </li>
          ) : null}
        </ul>

        {auth ? (
          <div className="navbarLogin">
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
          <div className="navbarLogin">
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
      </nav>
    </div>
  );
}

export default Navbar;
