import React, { useContext } from "react";
import AuthContext from "../../context/auth-context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

/**
 * Componente que muestra la barra de navegacion
 */
function Navbar() {
  const { auth, setAuth, userName, setUserName, setToken, setUserId } = useContext(AuthContext);

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
            <p className="navbarUserName">{userName}</p>
            <div />
            <Link
              to="/"
              component="button"
              onClick={() => {
                setAuth(false);
                setUserId("");
                setToken("");
                window.localStorage.removeItem("logged");
              }}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="navbarLogin">
            <Link to="/login">Login</Link>
            <div />
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
