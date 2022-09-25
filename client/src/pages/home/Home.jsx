import React, { useContext } from "react";
import Navbar from "../../commons/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "../../commons/footer/Footer";
import Offers from "./components/offers/Offers";
import "./Home.css";

/**
 * Componente que muestra el inicio de la tienda
 */
function Home() {
  return (
    <div className="container">
      <Navbar />
      <main className="mainContent">
        <Header />
        <Offers />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
