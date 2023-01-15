import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";

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
