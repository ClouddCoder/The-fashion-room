import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import OrderDetail from "./OrderDetail";
import axios from "axios";

function Order({ order }) {
  const { userId } = useContext(AuthContext);
  const [orderDetail, setOrderDetail] = useState();

  const loadOrderDetail = async () => {
    axios
      .post("http://localhost:3001/order-detail", { userId })
      .then((response) => setOrderDetail(response.data))
      .catch((err) => console.log(err));
    console.log(orderDetail);
  };

  useEffect(() => {
    loadOrderDetail();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item p={2}>
        <Typography variant="h5" component="h2">
          {order.invoice_id}
        </Typography>
        <Typography variant="h5" component="h2">
          {order.purchase_date}
        </Typography>
      </Grid>
      <Grid item container>
        {orderDetail?.map((item, index) => {
          return (
            <Grid item key={index}>
              <OrderDetail orderDetail={item} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Order;
