import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

/**
 * Componente que muestra el contenido de una orden
 */
function OrderDetail({ orderDetail }) {
  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 25,
        }}
        align="center"
      >
        <Typography variant="h6" component="div" sx={{ width: 150 }}>
          {orderDetail.product_name}
        </Typography>
        <Typography variant="h6" component="div" sx={{ width: 150 }}>
          {"x" + orderDetail.quantity}
        </Typography>
        <Typography variant="h6" component="div" sx={{ width: 150 }}>
          {"$" + orderDetail.total_amount}
        </Typography>
      </CardContent>
    </>
  );
}

export default OrderDetail;
