import React, { useContext } from "react";
import AuthContext from "../../context/auth-context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileButton from "./components/ProfileButton";
import CartButton from "./components/CartButton";

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
        <div className="navbarTitle">The fashion room</div>
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
            <div className="horizontal-line" />
            <div>
              <Link to="/wishlist">Wishlist</Link>
            </div>
            <div className="navbarCartButton">
              <CartButton />
            </div>
            <div className="navbarProfileButton">
              <ProfileButton resetSession={resetSession} />
            </div>
          </div>
        ) : (
          <div className="navbarLogin">
            <Link to="/login" component="button" onClick={resetForm}>
              Login
            </Link>
            <div className="horizontal-line" />
            <Link to="/register" component="button" onClick={resetForm}>
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
