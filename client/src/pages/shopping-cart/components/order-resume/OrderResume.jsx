import { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../../../context/product-context/ProductContext";
import BuyButton from "../BuyButton";
import "./OrderResume.css";

/**
 * Component to render the resume of the order.
 * @returns {JSX.Element} - OrderResume component.
 */
function OrderResume() {
  const {
    cart,
    totalProducts,
    totalPrice,
    addProductToBuy,
    getTotalProducts,
    getTotalPrice,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleBuyCart = () => {
    addProductToBuy(cart, true);
    navigate("/buy");
  };

  useEffect(() => {
    getTotalProducts();
    getTotalPrice(true);
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid item container justifyContent="flex-start">
            <span className="resume-title">Resumen de la compra</span>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <span className="resume-subtitle">Productos</span>
            </Grid>
            <Grid item>
              <span className="resume-subtitle">{totalProducts}</span>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid>
              <span className="resume-subtitle">Total</span>
            </Grid>
            <Grid>
              <span className="resume-subtitle">${totalPrice}</span>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Divider />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <BuyButton checkCart={cart} buyCart={handleBuyCart} />
      </CardActions>
    </Card>
  );
}

export default OrderResume;
