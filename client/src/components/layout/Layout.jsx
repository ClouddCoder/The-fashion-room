import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
