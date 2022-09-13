import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/product-context/ProductContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

function Wishlist() {
  const { wishlist, getWishlist } = useContext(ProductContext);

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Link to="/">Home</Link>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
