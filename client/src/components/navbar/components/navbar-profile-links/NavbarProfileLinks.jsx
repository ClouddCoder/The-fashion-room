import { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import ProfileButton from "../profile-button/ProfileButton";
import CustomButton from "../custom-button/CustomButton";
import AuthContext from "../../../../context/auth-context/AuthContext";
import "./NavbarProfileLinks.css";

/**
 * Component that renders the profile links in the navbar.
 * @param {string} newSelector - Class selector to render the links on the navbar or the overlay.
 * @returns {JSX.Element} - NavbarProfileLinks component
 */
function NavbarProfileLinks({ newSelector }) {
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

  /**
   * Resets the session.
   */
  const resetSession = () => {
    setAuth(false);
    setUser("");
    setUsername("");
    setToken("");
    setUserId("");
  };

  /**
   * Resets the form values in the login and register components.
   */
  const resetForm = () => {
    setUserName("");
    setUserLastname("");
    setUserEmail("");
    setUserPassword("");
  };

  return (
    <div className={newSelector}>
      {/* If the user is authenticated */}
      {auth ? (
        <>
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
        </>
      ) : (
        <>
          {/* If the user is not authenticated */}
          <div className="header__navbar__login">
            <Link to="/login" component="button" onClick={resetForm}>
              Login
            </Link>
          </div>
          <div className="vertical-line" />
          <div className="header__navbar__register">
            <Link to="/register" component="button" onClick={resetForm}>
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default NavbarProfileLinks;
