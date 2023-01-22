import { HeaderBackground } from "../../../../assets";
import "./Header.css";

/**
 * Component to render the header on the home page.
 * @returns {JSX.Element} - Header component.
 */
function Header() {
  return (
    <figure className="home-header">
      <img className="home-header__cover" src={HeaderBackground} alt="The Fashion Room" />
    </figure>
  );
}

export default Header;
