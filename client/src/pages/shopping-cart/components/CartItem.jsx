import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { getProductImage } from "../../../assets";

/**
 * Componente que muestra el producto que esta en el carrito de compras
 */
function CartItem({ product, removeFromCart }) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "140px",
    maxHeight: "140px",
    width: 128,
    height: 128,
  });

  return (
    <Box m={1}>
      <Paper
        sx={{
          p: 2,
          width: 600,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
        }}
        elevation={1}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Img alt="complex" src={getProductImage(product.product_name)} />
          </Grid>
          <Grid item={true} xs={12} sm container>
            <Grid item={true} xs container direction="column" spacing={2}>
              <Grid item={true} xs mt={3}>
                <h5>{product.product_name}</h5>
                <span>Cantidad a comprar x{product.quantity_to_purchase}</span>
                <span>Total = ${product.variant_price * product.quantity_to_purchase}</span>
              </Grid>
            </Grid>
            <Grid item>
              <h5>${product.variant_price}</h5>
              <Grid item container justifyContent="center" direction="column">
                <Grid item>
                  <Button onClick={() => removeFromCart(product.variant_id)} variant="outlined">
                    Eliminar uno
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => removeFromCart(product.variant_id, true)}
                    variant="outlined"
                  >
                    Eliminar todos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CartItem;
