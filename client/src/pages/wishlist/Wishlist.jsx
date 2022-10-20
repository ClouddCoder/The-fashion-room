import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import Wish from "./components/Wish";

function Wishlist() {
  const { wishlist, getWishlist } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) getWishlist();
  }, []);

  return (
    <div className="container">
      {console.log(wishlist)}
      <Navbar />
      <Grid container direction="row" sx={{ width: "60%", mt: 4, mb: 4 }}>
        {wishlist?.map((wish, i) => (
          <Wish key={i} product={wish} />
        ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default Wishlist;
