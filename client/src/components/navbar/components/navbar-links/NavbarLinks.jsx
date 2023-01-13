import { Link } from "react-router-dom";
import "./NavbarLinks.css";

function NavbarLinks({ displayMode }) {
  if (displayMode) {
    return (
      <ul className="header__navbar__small-screen-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/store-contact">Contact</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="header__navbar__links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/store-contact">Contact</Link>
      </li>
    </ul>
  );
}

export default NavbarLinks;
