import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import OrderResume from "./components/OrderResume";
import CartItem from "./components/CartItem";
import Layout from "../../components/layout/Layout";

/**
 * Component to render the shopping cart of the user.
 * @returns {JSX.Element} - ShoppingCart component.
 */
function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  return (
    <Layout>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button sx={{ width: 200, ml: 1 }} onClick={() => clearCart()} variant="outlined">
            Vaciar carrito
          </Button>
        </Grid>
        <Grid item container justifyContent="center" direction="column">
          {cart.map((product, index) => (
            <Grid item key={index}>
              <CartItem product={product} removeFromCart={removeFromCart} />
            </Grid>
          ))}
        </Grid>
        <Grid item justifyContent="center" xs={6}>
          <OrderResume />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ShoppingCart;
