import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getProductImage } from "../../../../assets";
import "./CartItem.css";

/**
 * Component to render the product's information.
 * @param {object} { product, removeFromCart } - product to show.
 * @returns
 */
function CartItem({ product, addToCart, removeFromCart }) {
  const [quantity, setQuantity] = useState(product.quantity_to_purchase);

  const handleChange = (e) => {
    setQuantity(e.target.value);
    addToCart({ variantId: product.variant_id, quantityToPurchase: e.target.value });
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <img alt="producto" src={getProductImage(product.product_name)} />
          </Grid>
          <Grid item container xs={8} direction="column" rowSpacing={1}>
            <Grid item>
              <span className="cart-item__product-name">{product.product_name}</span>
            </Grid>
            <Grid item>
              <FormControl size="small" sx={{ width: "100px" }}>
                <InputLabel id="quantity-select__label">Unidades</InputLabel>
                <Select
                  labelId="quantity-select__label"
                  id="quantity-select"
                  value={quantity}
                  label="Unidades"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <span className="cart-item__field">
                ${product.variant_price * product.quantity_to_purchase}
              </span>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => removeFromCart(product.variant_id)}>Eliminar</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CartItem;
