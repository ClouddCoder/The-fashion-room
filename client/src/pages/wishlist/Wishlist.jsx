import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import Wish from "./components/Wish";

function Wishlist() {
  const { loader, setLoader, wishlist, getWishlist } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);

  // Displays the loader every time the component is re-render.
  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    if (auth) getWishlist();
  }, []);

  return (
    <Layout>
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid container direction="row" sx={{ width: "60%", mt: 4, mb: 4 }}>
        {wishlist.map((wish, i) => (
          <Wish key={i} product={wish} />
        ))}
      </Grid>
    </Layout>
  );
}

export default Wishlist;
