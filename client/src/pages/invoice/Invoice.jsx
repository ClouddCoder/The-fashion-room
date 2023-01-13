import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Layout from "../../components/layout/Layout";
import ProductContext from "../../context/product-context/ProductContext";

/**
 * Componente que muestra la factura de la compra
 */
function Invoice() {
  const { productsToBuy, totalPrice, clearCart, invoiceId, shippingCost } =
    useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Layout>
      <Grid container justifyContent="center">
        <Grid item>
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
                <h3>Detalles de la compra</h3>
                <span>{`#${invoiceId}`}</span>
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
                <h4>Productos</h4>
                <Grid item container direction="column">
                  {productsToBuy?.map((product, i) => (
                    <Grid
                      item
                      container
                      key={i}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>
                        {product.product_name} x{product.quantity_to_purchase}
                      </span>
                      <span>{`$${product.variant_price * product.quantity_to_purchase}`}</span>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
              <Grid item container>
                <Grid
                  item
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Costo de envío</h4>
                  <span>{`$${shippingCost}`}</span>
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
                  <h4>Total</h4>
                  <span>{`$${totalPrice + shippingCost}`}</span>
                </Grid>
              </Grid>
              <Grid item align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    navigate("/");
                    clearCart();
                  }}
                >
                  Seguir comprando
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Invoice;
