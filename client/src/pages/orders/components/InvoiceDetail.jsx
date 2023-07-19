import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { getProductImage } from "../../../assets";
import { checkScreenSize } from "../../../utils/MUIMediaQuery";
import "./InvoiceDetail.css";

/**
 * Component to render the products purchased by the user.
 * @param {object} { product } - product to show.
 * @returns {JSX.Element} - InvoiceDetail component.
 */
function InvoiceDetail({ product }) {
  const navigate = useNavigate();

  const screenSize = checkScreenSize();

  return (
    <Grid item container justifyContent="center">
      <Card sx={{ width: "100%" }}>
        <CardHeader
          titleTypographyProps={{ variant: "span" }}
          title={`Factura #${product.order_detail_id}`}
          action={
            screenSize === "phone" && (
              <Link to={`/product/${product.product_id}-${product.variant_id}`}>
                <span id="link-field">Volver a comprar</span>
              </Link>
            )
          }
          sx={{
            backgroundColor: "var(--color-primary-brown)",
            color: "var(--color-primary-white)",
          }}
        />
        <Box sx={{ display: "flex" }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
            align="center"
          >
            <div className="order-details">
              <img
                alt={product.variant_name}
                src={getProductImage(product.variant_name)}
              />
              <div className="order-details__container">
                <div className="order-details__product-name">
                  <span>{product.product_name}</span>
                </div>
                <div className="order-details__prices">
                  <div className="order-details__unit-price">
                    <span>{`$${product.variant_price}`}</span>
                    <span>{`x${product.product_quantity}`}</span>
                  </div>
                  <div className="order-details__total-price">
                    <span>Total:</span>
                    <span>{`$${product.item_total_cost}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <Box
            component={CardActions}
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: { sm: "row-reverse" },
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate(
                  `/product/${product.product_id}-${product.variant_id}`,
                );
              }}
              sx={{ width: "160px" }}
            >
              Volver a comprar
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

export default InvoiceDetail;
