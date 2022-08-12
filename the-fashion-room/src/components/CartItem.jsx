import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
            <Img alt="complex" src={require(`../assets/products/${product.product_name}.png`)} />
          </Grid>
          <Grid item={true} xs={12} sm container>
            <Grid item={true} xs container direction="column" spacing={2}>
              <Grid item={true} xs mt={3}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Cantidad a comprar x{product.quantityInCart}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total = ${product.price * product.quantityInCart}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ${product.price}
              </Typography>
              <Grid item container justifyContent="center" direction="column">
                <Grid item>
                  <Button onClick={() => removeFromCart(product.product_id)} variant="outlined">
                    Eliminar uno
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => removeFromCart(product.product_id, true)}
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
