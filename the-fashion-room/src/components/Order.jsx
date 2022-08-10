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
      .then(response => {
        const groupsOrderDetail = Object.values(
          response.data.reduce(
            (acc, item) => ({
              ...acc,
              [item.invoice_id]: (acc[item.invoice_id] || []).concat(item),
            }),
            {}
          )
        );
        return setOrderDetail(groupsOrderDetail);
      })
      .catch(err => console.log(err));
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
        {orderDetail?.map(group => {
          return (
            <Grid item>
              {group.map((item, index) => {
                return <OrderDetail orderDetail={item} key={index} />;
              })}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Order;
