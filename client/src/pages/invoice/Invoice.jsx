import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import ProductContext from "../../context/product-context/ProductContext";

/**
 * Componente que muestra la factura de la compra
 */
function Invoice() {
  const { productsToBuy, totalPrice, clearCart, invoiceId } = useContext(ProductContext);
  const navigate = useNavigate();

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
              <CustomTypography variant="h3">Detalles de la compra</CustomTypography>
              <CustomTypography variant="body2">{`#${invoiceId}`}</CustomTypography>
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
              <CustomTypography variant="h4">Productos</CustomTypography>
              <Grid item container direction="column">
                {productsToBuy?.map((product) => (
                  <Grid
                    item
                    container
                    key={product[0]?.product_id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CustomTypography variant="body2">
                      {product[0]?.product_name} x{product[3]?.quantity_to_purchase}
                    </CustomTypography>
                    <CustomTypography variant="body2">
                      ${product[0].variant_price * product[3].quantity_to_purchase}
                    </CustomTypography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item container justifyContent="center">
              <Divider />
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
              <CustomTypography variant="h4">Total</CustomTypography>
              <CustomTypography variant="body2">${totalPrice}</CustomTypography>
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
