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
    if (componentName === "buy") {
      return (
        <div className="layout">
          <Navbar />
          <main className="main-content">{children}</main>
        </div>
      );
    }

    // In the ShoppingCart component is important to set height to 100%
    // to stick the footer to the bottom of the page.
    if (componentName === "cart") {
      return (
        <div className="layout hundred-height">
          <Navbar />
          <main className="main-content">{children}</main>
        </div>
      );
    }
  }

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content no-scroll-main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
