import { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import ProfileButton from "../profile-button/ProfileButton";
import AuthContext from "../../../../context/auth-context/AuthContext";
import "./NavbarProfileLinks.css";

/**
 * Component that renders the profile links in the navbar.
 * @param {string} newSelector - Class selector to render the links on the navbar or the overlay.
 * @returns {JSX.Element} - NavbarProfileLinks component
 */
function NavbarProfileLinks({ newSelector }) {
  const { auth, user, resetSession, resetForm } = useContext(AuthContext);

  return (
    <ul className={newSelector}>
      {/* If the user is authenticated */}
      {auth ? (
        <>
          <li className="header__navbar__username">
            <span>{`¡Hola ${user}!`}</span>
          </li>
          <li className="header__navbar__my-profile">
            <Link to="/profile">
              <PersonOutlineOutlinedIcon />
              <span>Mi perfil</span>
            </Link>
          </li>
          <li className="header__navbar__wishlist">
            <Link to="/wishlist">
              <FavoriteBorderOutlinedIcon />
              <span className="icon-name">Wishlist</span>
            </Link>
          </li>
          <li className="header__navbar__cart">
            <Link to="/cart">
              <ShoppingCartOutlinedIcon />
              <span className="icon-name">Mi carrito</span>
            </Link>
          </li>
          <li className="header__navbar__my-orders">
            <Link to="/orders">
              <ShoppingBagOutlinedIcon />
              <span>Mis compras</span>
            </Link>
          </li>
          <li className="header__navbar__profile">
            <ProfileButton resetSession={resetSession} />
          </li>
        </>
      ) : (
        <>
          {/* If the user is not authenticated */}
          <li className="header__navbar__login">
            <Link to="/login" onClick={resetForm}>
              Ingresar
            </Link>
          </li>
          <div className="vertical-line" />
          <li className="header__navbar__register">
            <Link to="/register" onClick={resetForm}>
              Registrarse
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavbarProfileLinks;
