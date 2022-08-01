import React, { useContext } from "react";
import { Grid, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import ProductContext from "../context/ProductContext";

function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  return (
    <Container>
      <Grid container direction="column">
        <Grid item container justifyContent="center">
          <Button sx={{ width: 200, mr: 1 }} onClick={() => clearCart()} variant="outlined">
            Vaciar carrito
          </Button>
          <Button sx={{ width: 200, ml: 1 }} component={Link} to="/catalogue" variant="outlined">
            Regresar
          </Button>
        </Grid>
        {cart.map(product => (
          <CartItem key={product.product_id} product={product} removeFromCart={removeFromCart} />
        ))}
      </Grid>
    </Container>
  );
}

export default ShoppingCart;
