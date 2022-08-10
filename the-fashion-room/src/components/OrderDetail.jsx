import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function OrderDetail({ orderDetail }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {orderDetail.invoice_id}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="h2">
          {orderDetail.product_name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="h2">
          {orderDetail.quantity}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="h2">
          {orderDetail.total_amount}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderDetail;
