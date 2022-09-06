import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

/**
 * Componente que muestra el resumen de la compra que se va a realizar
 */
function OrderResume({ buyProducts, getCart, invoice, orderTotalProducts, orderTotalPrice }) {
  /**
   * Revisa si hay productos en el carrito para habilitar el boton de compra
   */
  const checkCartLength = () => {
    if (getCart.length > 0) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            buyProducts();
            invoice(getCart);
          }}
        >
          Comprar
        </Button>
      );
    } else {
      return (
        <Typography variant="h6" component="div">
          Carrito vacío
        </Typography>
      );
    }
  };

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
            {orderTotalProducts}
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
            ${orderTotalPrice}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <ColorWhiteLine color="white" />
        </Grid>
        <Grid item align="center">
          {checkCartLength()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OrderResume;
