import React, { useEffect, useState } from "react";
import { Button, Grid, Container, styled } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";

function Catalogue() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3001/catalogue");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </Grid>
      <Button component={Link} variant="contained" to="/" color="primary">
        Regresar
      </Button>
    </Container>
  );
}

export default Catalogue;
