import React, { useContext } from "react";
import { Grid, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import ProductContext from "../context/ProductContext";

function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  const buyProducts = async () => {
    const res = await fetch("http://localhost:3001/cart", {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });

    /*
    if (res.status === 200) {
      console.log(data);
    }
    */
  };

  return (
    <Container>
      <Grid container direction="column">
        <Grid item container justifyContent="center">
          <Button sx={{ width: 200, mr: 1 }} component={Link} to="/catalogue" variant="outlined">
            Regresar
          </Button>
          <Button sx={{ width: 200, ml: 1 }} onClick={() => clearCart()} variant="outlined">
            Vaciar carrito
          </Button>
        </Grid>
        {cart.map((product) => (
          <CartItem key={product.product_id} product={product} removeFromCart={removeFromCart} />
        ))}
      </Grid>
      <Button variant="contained" color="secondary" onClick={buyProducts}>
        Comprar
      </Button>
    </Container>
  );
}

export default ShoppingCart;
