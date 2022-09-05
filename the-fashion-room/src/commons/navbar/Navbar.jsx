import React, { useContext } from "react";
import AuthContext from "../../context/auth-context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

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
            <p className="navbarUserName">{user}</p>
            <div />
            <Link
              to="/"
              component="button"
              onClick={() => {
                resetSession();
                window.localStorage.removeItem("logged");
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="navbarLogin">
            <Link to="/login" component="button" onClick={resetForm}>
              Login
            </Link>
            <div />
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
