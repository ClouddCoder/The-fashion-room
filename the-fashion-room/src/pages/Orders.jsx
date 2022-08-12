import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/auth-context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import InvoiceDetail from "../components/InvoiceDetail";

function Orders() {
  const { userId } = useContext(AuthContext);
  const [orderDetail, setOrderDetail] = useState();

  const loadOrderDetail = async () => {
    axios
      .post("http://api-server:3001/order-detail", { userId })
      .then((response) => {
        const groupsOrderDetail = Object.values(
          response.data.reduce(
            (acc, item) => ({
              ...acc,
              [item.invoice_id]: (acc[item.invoice_id] || []).concat(item),
            }),
            {},
          ),
        );
        return setOrderDetail(groupsOrderDetail);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrderDetail();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Navbar />
      </Grid>
      <Container>
        <Grid container direction="column" sx={{ height: "auto", pt: 5, pb: 55 }}>
          <Grid item>
            <Typography variant="h3">Mis ordenes</Typography>
          </Grid>
          <Grid item container direction="column">
            {orderDetail?.map((group, i) => {
              return <InvoiceDetail groupItems={group} key={i} />;
            })}
          </Grid>
        </Grid>
      </Container>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Orders;
