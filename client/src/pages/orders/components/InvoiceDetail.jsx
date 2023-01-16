import { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getProductImage } from "../../../assets";
import ProductContext from "../../../context/product-context/ProductContext";
import "./InvoiceDetail.css";

/**
 *  Component to render the products purchased by the user.
 * @param {object} { product } - product to show.
 * @returns {JSX.Element} - InvoiceDetail component.
 */
function InvoiceDetail({ product }) {
  const { removeOrder } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Grid item mt={4} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title="Finalizado"
          subheader={`Factura #${product.order_detail_id}`}
          sx={{ backgroundColor: "#17CCF9", height: "auto", p: "10" }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "auto",
          }}
          align="center"
        >
          <div>
            <img
              alt={product.product_name}
              src={getProductImage(product.product_name)}
              style={{ width: 120, height: 120 }}
            />
            <div style={{ float: "right" }}>
              <h6>{product.product_name}</h6>
              <div className="order-price-quantity">
                <span>{`$${product.variant_price}`}</span>
                <span>{`x${product.product_quantity}`}</span>
              </div>
            </div>
          </div>
          <div className="order-user-options">
            <span>{`Total compra: $${product.item_total_cost}`}</span>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/product/${product.product_id}-${product.variant_id}`);
              }}
            >
              Volver a comprar
            </Button>
            <Button variant="contained" color="primary" onClick={() => removeOrder(product)}>
              Borrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default InvoiceDetail;
