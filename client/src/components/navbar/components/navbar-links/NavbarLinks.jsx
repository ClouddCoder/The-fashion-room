import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
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
        <Link to="/">
          <HomeOutlinedIcon />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/store-contact">
          <StorefrontOutlinedIcon />
          <span>Stores</span>
        </Link>
      </li>
    </ul>
  );
}

export default NavbarLinks;
