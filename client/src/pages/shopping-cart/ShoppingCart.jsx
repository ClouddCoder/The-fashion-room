import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import OrderResume from "./components/OrderResume";
import CartItem from "./components/CartItem";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra el carrito de compras
 */
function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  return (
    <div className="container">
      <Navbar />
      <Grid container spacing={2}>
        <Grid item={true} container xs={6}>
          <Grid item container justifyContent="center">
            <Grid item>
              <Button
                sx={{ width: 200, mr: 1 }}
                component={Link}
                to="/catalogue"
                variant="outlined"
              >
                Regresar
              </Button>
            </Grid>
            <Grid item>
              <Button sx={{ width: 200, ml: 1 }} onClick={() => clearCart()} variant="outlined">
                Vaciar carrito
              </Button>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" direction="column">
            {cart.map((product, index) => (
              <Grid item key={index}>
                <CartItem product={product} removeFromCart={removeFromCart} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item={true} justifyContent="center" xs={6}>
          <OrderResume />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default ShoppingCart;
