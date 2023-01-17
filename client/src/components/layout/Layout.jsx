import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { checkScreenSize } from "../../utils/MUIMediaQuery";
import "./Layout.css";

/**
 * This component is used as layout for all the components.
 * @param {object} { componentName, children } - componentName identifies the type of component.
 * @returns {JSX.Element} - Layout component
 */
function Layout({ componentName, children }) {
  const screenSize = checkScreenSize();

  // If the screen size is phone, the footer is not rendered.
  if (screenSize === "phone") {
    return (
      <div className="layout">
        <Navbar />
        <main className="main-content">{children}</main>
        {componentName !== "buy" && <Footer />}
      </div>
    );
  }

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
