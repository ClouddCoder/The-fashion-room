import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";
import ProductContext from "../../../context/product-context/ProductContext";

/**
 * Componente que muestra el resumen de la compra que se va a realizar
 */
function OrderResume() {
  const { cart, totalProducts, totalPrice, addProductToBuy, getTotalProducts, getTotalPrice } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const handleBuyCart = () => {
    addProductToBuy(cart, true);
    navigate("/buy");
  };

  useEffect(() => {
    getTotalProducts();
    getTotalPrice();
  }, []);

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
    }
    return <CustomTypography variant="h6">Carrito vacío</CustomTypography>;
  };

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
          <CustomTypography variant="h5">Resumen de la compra</CustomTypography>
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
          <CustomTypography variant="h6">Productos</CustomTypography>
          <CustomTypography variant="h6">{totalProducts}</CustomTypography>
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
          <CustomTypography variant="h6">Total</CustomTypography>
          <CustomTypography variant="h6">${totalPrice}</CustomTypography>
        </Grid>
        <Grid item container justifyContent="center">
          <Divider />
        </Grid>
        <Grid item align="center">
          {checkCartLength()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OrderResume;
