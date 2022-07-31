import React, { useEffect, useReducer } from "react";
import { Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { shoppingCartinitialState, shoppingCartReducer } from "../reducers/shoppingCartReducer";
import { TYPES } from "../actions/shoppingCartActions";

function Catalogue() {
  const [state, dispatch] = useReducer(shoppingCartReducer, shoppingCartinitialState);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3001/catalogue");
    const data = await response.json();
    dispatch({ type: "success", payload: data, response: "Productos cargados" });
  };

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const clearCart = () => {};

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        {state.products.map((product) => (
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
