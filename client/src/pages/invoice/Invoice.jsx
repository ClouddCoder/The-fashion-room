import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Layout from "../../components/layout/Layout";
import CardContentNoPadding from "../../utils/CardContentNoPadding";
import ProductContext from "../../context/product-context/ProductContext";

/**
 *  Component to render the invoice of the purchase.
 * @returns {JSX.Element} - Invoice component.
 */
function Invoice() {
  const { productsToBuy, totalPrice, clearCart, invoiceId, shippingCost } =
    useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Layout>
      <Card
        sx={{
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <CardContentNoPadding>
          <Grid
            container
            direction="column"
            sx={{ height: "auto", p: "15px" }}
            rowSpacing={2}
          >
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <h3>Detalles de la compra</h3>
              </Grid>
              <Grid item>
                <span className="invoice-number">{`#${invoiceId}`}</span>
              </Grid>
            </Grid>
            <Grid item container direction="column" rowSpacing={1}>
              <Grid item>
                <h4>Productos</h4>
              </Grid>
              <Grid item container direction="column" rowSpacing={1}>
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
                    <span>{`$${
                      product.variant_price * product.quantity_to_purchase
                    }`}</span>
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
        </CardContentNoPadding>
      </Card>
    </Layout>
  );
}

export default Invoice;
