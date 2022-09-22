import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Blusa, Camisa, Corbata, Pantalon, Pantaloneta, Zapatos } from "../../../assets";

/**
 * Componente que muestra la informacion de la orden
 */
function InvoiceDetail({ groupItems }) {
  /**
   * Obtiene la imagen del producto dependiendo de su nombre
   */
  const getProductImage = (productName) => {
    switch (productName) {
      case "Blusa":
        return Blusa;
      case "Camisa":
        return Camisa;
      case "Corbata":
        return Corbata;
      case "Pantalon":
        return Pantalon;
      case "Pantaloneta":
        return Pantaloneta;
      case "Zapatos":
        return Zapatos;
      default:
        return null;
    }
  };

  return (
    <Grid item mt={4} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title="Finalizado"
          subheader={"Factura #" + groupItems.invoice_id}
          sx={{ backgroundColor: "#17CCF9", height: "auto", p: "10" }}
        ></CardHeader>
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
              alt={groupItems.product_name}
              src={getProductImage(groupItems.product_name)}
              style={{ width: 120, height: 120 }}
            ></img>
            <div style={{ float: "right" }}>
              <Typography variant="h6" component="div" sx={{ width: 150 }}>
                {groupItems.product_name}
              </Typography>
              <Typography variant="body2" component="div" sx={{ width: 150 }}>
                {"$" + groupItems.total_amount}
              </Typography>
              <Typography variant="body2" component="div" sx={{ width: 150 }}>
                {"x" + groupItems.quantity}
              </Typography>
            </div>
          </div>
          <div className="options">
            <Link to="/catalogue" sx={{ display: "block" }}>
              Volver a comprar
            </Link>
            <Button variant="contained" color="primary">
              Borrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default InvoiceDetail;
