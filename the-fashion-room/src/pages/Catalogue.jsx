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
      <Grid container alignItems="center" justifyContent="center">
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
        ))}
      </Grid>
      <Button component={Link} to="/" variant="contained" color="primary">
        Regresar
      </Button>
      <br />
      <Button variant="contained" color="primary">
        Limpiar carrito
      </Button>
      <br />
      <Button component={Link} to="/cart" variant="contained" color="primary">
        Ir al carrito
      </Button>
    </Container>
  );
}

export default Catalogue;
