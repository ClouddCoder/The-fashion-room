import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/auth-context/AuthContext";
import Order from "../components/Order";
import axios from "axios";

function Orders() {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState();
  const [invoiceId, setInvoiceId] = useState(null);

  const loadOrders = async () => {
    const res = axios.post("http://localhost:3001/orders", { userId }).then(response => {
      console.log(response.data);
    });
    const data = await res.data;
    setOrders(data);
    console.log(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container>
      <Grid container direction="column" sx={{ height: "auto", pt: 5, pb: 5 }}>
        <Grid item>
          <Typography variant="h3">Mis ordenes</Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}

export default Orders;
