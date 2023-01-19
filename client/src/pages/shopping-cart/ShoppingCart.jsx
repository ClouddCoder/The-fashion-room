import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import OrderResume from "./components/order-resume/OrderResume";
import CartItem from "./components/cart-item/CartItem";
import Layout from "../../components/layout/Layout";
import { getMUIprops } from "../../utils/MUIMediaQuery";
import {
  resumePhoneStyle,
  resumeTabletStyle,
  resumeDesktopStyle,
  resumeLargeDevicesStyle,
} from "./ShoppingCartMUIStyle";

/**
 * Component to render the shopping cart of the user.
 * @returns {JSX.Element} - ShoppingCart component.
 */
function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useContext(ProductContext);

  const resumeComponentProps = getMUIprops(
    resumePhoneStyle,
    resumeTabletStyle,
    resumeDesktopStyle,
    resumeLargeDevicesStyle,
  );

  return (
    <Layout componentName="cart">
      <Grid container direction="column" sx={{ width: "90%", maxWidth: "700px" }} rowSpacing={2}>
        <Grid item>
          <h3>Carrito</h3>
        </Grid>
        <Grid container direction="column">
          {cart.map((product, index) => (
            <Grid item key={index}>
              <CartItem product={product} removeFromCart={removeFromCart} />
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button sx={{ width: "200px" }} onClick={() => clearCart()} variant="outlined">
            Vaciar carrito
          </Button>
        </Grid>
        <Grid item justifyContent="center" sx={resumeComponentProps}>
          <OrderResume />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ShoppingCart;
