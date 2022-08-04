import React, { useEffect, useContext } from "react";
import { Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductContext from "../context/ProductContext";

function Catalogue() {
  const { addToCart, loadProducts, products } = useContext(ProductContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container justifyContent="center" mt={20}>
        <Grid item>
          <Button sx={{ mr: 1 }} component={Link} to="/" variant="outlined" color="primary">
            Regresar
          </Button>
          <Button sx={{ ml: 1 }} component={Link} to="/cart" variant="outlined" color="primary">
            Ir al carrito
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        {products.map(product => (
          <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
        ))}
      </Grid>
    </Container>
  );
}

export default Catalogue;
