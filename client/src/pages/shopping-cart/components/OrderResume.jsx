import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../../context/product-context/ProductContext";

/**
 * Component to render the resume of the order.
 * @returns {JSX.Element} - OrderResume component.
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
    getTotalPrice(true);
  }, []);

  /**
   * Checks if there are products in the shopping cart to enable
   * the Buy button.
   */
  const checkCartLength = () => {
    if (cart.length > 0) {
      return (
        <Button variant="contained" color="secondary" onClick={handleBuyCart}>
          Comprar
        </Button>
      );
    }
    return <h6>Carrito vacío</h6>;
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
          <h5>Resumen de la compra</h5>
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
          <h6>Productos</h6>
          <h6>{totalProducts}</h6>
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
          <h6>Total</h6>
          <h6>${totalPrice}</h6>
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
