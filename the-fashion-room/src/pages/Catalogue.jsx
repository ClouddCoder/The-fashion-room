import React, { useEffect, useContext } from "react";
import { Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductContext from "../context/ProductContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Catalogue() {
  const { addToCart, loadProducts, products } = useContext(ProductContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Container component="div" sx={{ height: "auto", mt: 5, mb: 5 }}>
        <Grid container>
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
            {products.map((product) => (
              <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Catalogue;
