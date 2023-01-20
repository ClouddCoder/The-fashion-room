import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import OrderResume from "./components/order-resume/OrderResume";
import CartItem from "./components/cart-item/CartItem";
import Layout from "../../components/layout/Layout";
import { getMUIprops } from "../../utils/MUIMediaQuery";
import * as cartMUIProps from "./ShoppingCartMUIStyle";

/**
 * Component to render the shopping cart of the user.
 * @returns {JSX.Element} - ShoppingCart component.
 */
function ShoppingCart() {
  const { cart, addProductToCart, removeFromCart, clearCart } = useContext(ProductContext);

  // Props for the OrderResume component.
  const resumeComponentProps = getMUIprops(
    cartMUIProps.resumePhoneStyle,
    cartMUIProps.resumeTabletStyle,
    cartMUIProps.resumeDesktopStyle,
    cartMUIProps.resumeLargeDevicesStyle,
  );

  return (
    <Layout componentName="cart">
      {console.log(cart)}
      <Grid
        container
        direction="column"
        rowSpacing={4}
        sx={{ width: "90%", maxWidth: "800px", p: 2 }}
      >
        <Grid item>
          <h3>Carrito</h3>
        </Grid>
        <Grid item container direction={{ xs: "column", sm: "row" }} columnSpacing={2}>
          <Grid item container direction="column" sm={7} rowSpacing={2}>
            {cart.map((product, index) => (
              <Grid item key={index}>
                <CartItem
                  product={product}
                  addToCart={addProductToCart}
                  removeFromCart={removeFromCart}
                />
              </Grid>
            ))}
            <Grid item>
              <Button sx={{ width: "200px" }} onClick={() => clearCart()} variant="outlined">
                Vaciar carrito
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={5} sx={resumeComponentProps}>
            <OrderResume />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ShoppingCart;
