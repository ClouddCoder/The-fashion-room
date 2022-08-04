import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import ProductContext from "../context/ProductContext";
import OrderResume from "../components/OrderResume";
import { useEffect } from "react";

function ShoppingCart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    getTotalProducts,
    getTotalPrice,
    totalProducts,
    totalPrice,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    getTotalProducts();
    getTotalPrice();
  }, []);

  const buyProducts = async () => {
    const res = await fetch("http://localhost:3001/cart", {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();
    console.log(data);
    navigate("/invoice");
  };

  return (
    <Grid container sx={{ mt: 20 }}>
      <Grid item={true} container direction="column" xs={6}>
        <Grid item container justifyContent="center">
          <Button sx={{ width: 200, mr: 1 }} component={Link} to="/catalogue" variant="outlined">
            Regresar
          </Button>
          <Button sx={{ width: 200, ml: 1 }} onClick={() => clearCart()} variant="outlined">
            Vaciar carrito
          </Button>
        </Grid>
        {cart.map(product => (
          <CartItem key={product.product_id} product={product} removeFromCart={removeFromCart} />
        ))}
      </Grid>
      <Grid item={true} container justifyContent="center" xs={6}>
        <OrderResume
          buyProducts={buyProducts}
          orderTotalProducts={totalProducts}
          orderTotalPrice={totalPrice}
        />
      </Grid>
    </Grid>
  );
}

export default ShoppingCart;
