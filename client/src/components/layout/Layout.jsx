import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";

/**
 * This component is used as layout for all the components.
 * @param {object} { children }
 * @returns {JSX.Element} - Layout component
 */
function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
