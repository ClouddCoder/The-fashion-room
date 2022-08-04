import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";

function Invoice({ cart, buyProducts }) {
  let totalProducts = cart.map(product => product.quantityInCart).reduce((a, b) => a + b, 0);
  let totalPrice = cart
    .map(product => product.price * product.quantityInCart)
    .reduce((a, b) => a + b, 0);

  const ColorWhiteLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        width: "100%",
      }}
    />
  );

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "info.main",
        margin: "auto",
        height: "200px",
        width: "500px",
        position: "fixed",
      }}
      elevation={1}
    >
      <Grid container direction="column">
        <Grid item container justifyContent="center" mt={2} mb={2}>
          <Typography variant="h5" component="div">
            Resumen de la compra
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Productos
          </Typography>
          <Typography variant="h6" component="div">
            {totalProducts}
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Total
          </Typography>
          <Typography variant="h6" component="div">
            ${totalPrice}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <ColorWhiteLine color="white" />
        </Grid>
        <Grid item align="center">
          <Button variant="contained" color="secondary" onClick={() => buyProducts()}>
            Comprar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Invoice;
