import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/auth-context/AuthContext";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";

function Orders() {
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
    <Container>
      <Grid container direction="column" sx={{ height: "auto", pt: 5, pb: 5 }}>
        <Grid item>
          <Typography variant="h3">Mis ordenes</Typography>
        </Grid>
        <Grid item container direction="column">
          {orderDetail?.map((group, i) => {
            return (
              <Grid container item direction="column" key={i}>
                <Grid item>
                  <Typography variant="h4">Factura #{group[0].invoice_id}</Typography>
                </Grid>
                <Grid item>
                  {group.map((item, index) => {
                    return <OrderDetail orderDetail={item} key={index} />;
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Orders;
