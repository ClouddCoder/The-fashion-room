import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";

function Invoice({ cart }) {
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
            {cart.map((product) => product.quantityInCart).reduce((a, b) => a + b, 0)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Invoice;
