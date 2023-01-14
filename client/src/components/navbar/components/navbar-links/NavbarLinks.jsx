import { Link } from "react-router-dom";
import "./NavbarLinks.css";

/**
 * Components that renders the navbar links.
 * @param {string} newSelector - Selector to know which links must be displayed.
 * @returns {JSX.Element} - Navbar links.
 */
function NavbarLinks({ newSelector }) {
  return (
    <ul className={newSelector}>
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
