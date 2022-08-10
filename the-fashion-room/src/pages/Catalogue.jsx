import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductContext from "../context/product-context/ProductContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Catalogue() {
  const { addToCart, loadProducts, products } = useContext(ProductContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item={true} sx={{ height: "auto", pt: 20, pb: 20 }}>
        <Grid container component="div">
          <Grid item container justifyContent="center">
            <Button sx={{ mr: 1 }} component={Link} to="/" variant="outlined" color="primary">
              Regresar
            </Button>
            <Button
              sx={{ ml: 1 }}
              component={Link}
              to="/cart"
              variant="outlined"
              color="primary"
            >
              Ir al carrito
            </Button>
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
            {products.map(product => (
              <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Catalogue;
