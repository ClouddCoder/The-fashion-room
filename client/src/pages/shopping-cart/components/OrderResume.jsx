import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../../context/product-context/ProductContext";

/**
 * Componente que muestra el resumen de la compra que se va a realizar
 */
function OrderResume() {
  const { cart, totalProducts, totalPrice, addProductToBuy } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleBuyCart = () => {
    addProductToBuy(cart, true);
    navigate("/buy");
  };

  /**
   * Revisa si hay productos en el carrito para habilitar el boton de compra
   */
  const checkCartLength = () => {
    if (cart.length > 0) {
      return (
        <Button variant="contained" color="secondary" onClick={handleBuyCart}>
          Comprar
        </Button>
      );
    } else {
      return <Typography variant="h6">Carrito vacío</Typography>;
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
          <Typography variant="h5">Resumen de la compra</Typography>
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
          <Typography variant="h6">Productos</Typography>
          <Typography variant="h6">{totalProducts}</Typography>
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
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${totalPrice}</Typography>
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
