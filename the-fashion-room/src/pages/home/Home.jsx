import React from "react";
import Navbar from "../../commons/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "../../commons/footer/Footer";
import Offers from "./components/offers/Offers";

/**
 * Componente que muestra el inicio de la tienda
 */
function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Offers />
      <Footer />
    </div>
  );
}

export default Home;
