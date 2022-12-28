import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import ProductToBuy from "./components/ProductToBuy";
import "./Buy.css";

function Buy() {
  const navigate = useNavigate();
  const {
    productsToBuy,
    createInvoice,
    getTotalPrice,
    getTotalProducts,
    totalPrice,
    getTotalShippingCost,
    shippingCost,
  } = useContext(ProductContext);

  const { token } = useContext(AuthContext);

  const spanProps = {
    variant: "body2",
    component: "span",
    sx: { display: "block", m: "8px 0" },
  };

  const subtitleProps = { variant: "subtitle1", sx: { fontWeight: "bold" } };

  /**
   * Updates the product's available quantity in the database after
   * the purchase.
   */
  // eslint-disable-next-line consistent-return
  const buyProducts = async () => {
    try {
      const res = await fetch("http://localhost:3050/api/buy", {
        method: "PUT",
        body: JSON.stringify(productsToBuy),
        headers: new Headers({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/invoice");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalProducts(true);
    getTotalPrice();
  }, []);

  useEffect(() => {
    getTotalShippingCost();
  }, []);

  return (
    <Layout>
      <Grid container sx={{ width: "80%", m: "auto 0" }} spacing={2}>
        <Grid item={true} xs={8} container direction="column" spacing={2}>
          <Grid item>
            <Card>
              <CardContent>
                <CustomTypography {...subtitleProps}>Direccion de entrega</CustomTypography>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <CustomTypography {...subtitleProps}>Metodo de pago</CustomTypography>
                <CustomTypography {...spanProps}>Tarjeta de credito</CustomTypography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            {productsToBuy?.map((item, i) => (
              <ProductToBuy key={i} product={item} />
            ))}
          </Grid>
        </Grid>
        <Grid item={true} xs={4}>
          <Card>
            <CardContent>
              <CustomTypography {...subtitleProps}>Detalles</CustomTypography>
              <div className="purchase-details">
                <CustomTypography {...spanProps}>Coste total de los productos</CustomTypography>
                <CustomTypography {...spanProps}>{`$${totalPrice}`}</CustomTypography>
              </div>
              <div className="purchase-details">
                <CustomTypography {...spanProps}>Código del cupon</CustomTypography>
                <CustomTypography {...spanProps}>4A5S12</CustomTypography>
              </div>
              <div className="purchase-details">
                <CustomTypography {...spanProps}>Total de envío</CustomTypography>
                <CustomTypography {...spanProps}>{`$${shippingCost}`}</CustomTypography>
              </div>
              <Divider sx={{ m: "8px 0" }} />
              <div className="purchase-details">
                <CustomTypography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight: "bold", m: "8px 0" }}
                >
                  Total
                </CustomTypography>
                <CustomTypography {...spanProps}>
                  {`$${totalPrice + shippingCost}`}
                </CustomTypography>
              </div>
              <Button
                variant="contained"
                sx={{ width: "100%", borderRadius: "10px", m: "8px 0" }}
                onClick={() => {
                  buyProducts();
                  createInvoice(productsToBuy);
                }}
              >
                Realizar pedido
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Buy;
