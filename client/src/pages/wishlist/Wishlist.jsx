import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import Wish from "./components/Wish";

/**
 * Component to render the wishlist of the user.
 * @returns {JSX.Element} - Wishlist component.
 */
function Wishlist() {
  const { loader, setLoader, wishlist, getWishlist } =
    useContext(ProductContext);
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

      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "600px", p: 2 }}
        rowSpacing={4}
      >
        <Grid item>
          <h3>Favoritos</h3>
        </Grid>
        <Grid item container direction="column" rowSpacing={2}>
          {wishlist.map((wish, i) => (
            <Wish key={i} product={wish} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Wishlist;
