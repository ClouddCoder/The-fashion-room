import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../context/product-context/ProductContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra la factura de la compra
 */
function Invoice() {
  const { cart, totalPrice, clearCart, invoiceId } = useContext(ProductContext);
  const navigate = useNavigate();
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
    <Grid container direction="column">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item sx={{ height: "auto", pt: 15, pb: 27 }}>
        <Paper
          sx={{
            p: 4,
            bgcolor: "info.main",
            margin: "auto",
            height: "auto",
            width: "500px",
          }}
          elevation={1}
        >
          <Grid container direction="column" sx={{ height: "auto" }}>
            <Grid item container justifyContent="center">
              <Typography variant="h3" component="div">
                Detalles de la compra
              </Typography>
              <Typography variant="h6" component="div">
                {"#" + invoiceId}
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
              <Typography variant="h4" component="div">
                Productos
              </Typography>
              <Grid item container direction="column">
                {cart.map((product) => (
                  <Grid
                    item
                    container
                    key={product.product_id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" component="div">
                      {product.product_name} x{product.quantityInCart}
                    </Typography>
                    <Typography variant="h6" component="div">
                      ${product.price * product.quantityInCart}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <ColorWhiteLine color="white" />
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
              <Typography variant="h4" component="div">
                Total
              </Typography>
              <Typography variant="h5" component="div">
                ${totalPrice}
              </Typography>
            </Grid>
            <Grid item align="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigate("/catalogue");
                  clearCart();
                }}
              >
                Seguir comprando
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Invoice;
