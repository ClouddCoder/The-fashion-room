import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getProductImage } from "../../../../assets";
import "./CartItem.css";

/**
 * Component to render the product's information.
 * @param {object} { product, removeFromCart } - product to show.
 * @returns
 */
function CartItem({ product, removeFromCart }) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <img alt="producto" src={getProductImage(product.product_name)} />
          </Grid>
          <Grid item xs={8} container>
            <Grid item container direction="column">
              <Grid item>
                <span className="cart-item__product-name">{product.product_name}</span>
                <span className="cart-item__field">
                  Cantidad a comprar x{product.quantity_to_purchase}
                </span>
                <span className="cart-item__field">
                  Total = ${product.variant_price * product.quantity_to_purchase}
                </span>
              </Grid>
            </Grid>
            <Grid item>
              <span>${product.variant_price}</span>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => removeFromCart(product.variant_id)}>Eliminar uno</Button>
            <Button onClick={() => removeFromCart(product.variant_id, true)}>Eliminar todos</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CartItem;
