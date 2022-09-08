import React, { useContext, useEffect } from "react";
import ProductContext from "../../context/product-context/ProductContext";

function Wishlist() {
  const { wishlist, getWishlist } = useContext(ProductContext);

  useEffect(() => {
    getWishlist();
  }, []);

  return <div>{console.log(wishlist)}</div>;
}

export default Wishlist;
