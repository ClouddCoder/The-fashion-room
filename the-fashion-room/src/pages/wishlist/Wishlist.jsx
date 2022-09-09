import React, { useContext, useEffect } from "react";
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
      <Footer />
    </div>
  );
}

export default Wishlist;
