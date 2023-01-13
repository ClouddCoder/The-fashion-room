import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import ProductToBuy from "./components/ProductToBuy";
import { makeThePurchase } from "../../services/product";
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

  /**
   * Buys the products and updates the stock
   */
  // eslint-disable-next-line consistent-return
  const buyProducts = async () => {
    try {
      const res = await makeThePurchase(token, productsToBuy);
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
    getTotalProducts();
    getTotalPrice();
    getTotalShippingCost();
  }, []);

  return (
    <Layout>
      <Grid container sx={{ width: "80%", m: "auto 0" }} spacing={2}>
        <Grid item={true} xs={8} container direction="column" spacing={2}>
          <Grid item>
            <Card>
              <CardContent>
                <h3>Direccion de entrega</h3>
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
                <h3>Metodo de pago</h3>
                <span>Tarjeta de credito</span>
              </CardContent>
              span
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
              <h3>Detalles</h3>
              <div className="purchase-details">
                <span>Coste total de los productos</span>
                <span>{`$${totalPrice}`}</span>
              </div>
              <div className="purchase-details">
                <span>Código del cupon</span>
                <span>4A5S12</span>
              </div>
              <div className="purchase-details">
                <span>Total de envío</span>
                <span>{`$${shippingCost}`}</span>
              </div>
              <Divider sx={{ m: "8px 0" }} />
              <div className="purchase-details">
                <span>Total</span>
                <span>{`$${totalPrice + shippingCost}`}</span>
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
