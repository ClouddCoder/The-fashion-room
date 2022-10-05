import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getProductImage } from "../../../assets";
import ProductContext from "../../../context/product-context/ProductContext";
import "./InvoiceDetail.css";

/**
 * Componente que muestra la informacion de la orden
 */
function InvoiceDetail({ product }) {
  const { removeOrder } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Grid item mt={4} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title="Finalizado"
          subheader={`Factura #${product.invoice_id}`}
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
              <Typography variant="h6" sx={{ width: 150 }}>
                {product.product_name}
              </Typography>
              <div className="purchaseDetails">
                <Typography variant="body2" sx={{ width: 150 }}>
                  {`$${product.price}`}
                </Typography>
                <Typography variant="body2" sx={{ width: 150 }}>
                  {`x${product.quantity}`}
                </Typography>
              </div>
            </div>
          </div>
          <div className="purchaseOptions">
            <Typography variant="body2" sx={{ width: 150 }}>
              {`Total compra: $${product.total_amount}`}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/product/${product.product_id}`);
              }}
            >
              Volver a comprar
            </Button>
            <Button variant="contained" color="primary" onClick={removeOrder}>
              Borrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default InvoiceDetail;
