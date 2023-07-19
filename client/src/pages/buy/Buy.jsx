import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import ProductToBuy from "./components/ProductToBuy";
import { makeThePurchase } from "../../services/product";
import { getMUIprops } from "../../utils/MUIMediaQuery";
import {
  phoneStyle,
  tabletStyle,
  desktopStyle,
  largeDevicesStyle,
} from "./BuyMUIStyles";
import "./Buy.css";

/**
 * Component to render the buy page.
 * @returns {JSX.Element} - Buy component.
 */
function Buy() {
  let gridProps = {};
  gridProps = getMUIprops(
    phoneStyle,
    tabletStyle,
    desktopStyle,
    largeDevicesStyle,
  );

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
    <Layout componentName="buy">
      <Grid container sx={gridProps} spacing={2}>
        <Grid
          item
          container
          xs={12}
          sm={7}
          md={8}
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Card>
              <CardContent>
                <span className="buy-subtitle">Direccion de entrega</span>
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
                <span className="buy-subtitle">Metodo de pago</span>
                <span>Tarjeta de crédito/débito</span>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            {productsToBuy?.map((item, i) => (
              <ProductToBuy key={i} product={item} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Card>
            <CardContent>
              <span className="buy-subtitle">Detalles</span>
              <div className="purchase-details">
                <span>Coste total de los productos</span>
                <span>{`$${totalPrice}`}</span>
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
              <CardActions>
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
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Buy;
