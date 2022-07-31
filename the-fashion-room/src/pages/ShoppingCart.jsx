import React, { useContext } from "react";
import { Grid, Container } from "@mui/material";
import CartItem from "../components/CartItem";
import ProductContext from "../context/ProductContext";

function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  return (
    <Container>
      <Grid container direction="column">
        <button onClick={() => clearCart()}>Limpiar carrito</button>
        {cart.map((product) => (
          <CartItem key={product.product_id} product={product} removeFromCart={removeFromCart} />
        ))}
      </Grid>
    </Container>
  );
}

export default ShoppingCart;
