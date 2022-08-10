import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/auth-context/AuthContext";
import Order from "../components/Order";
import axios from "axios";

function Orders() {
  const { userId } = useContext(AuthContext);
  const [order, setOrder] = useState();

  const loadOrder = async () => {
    axios
      .post("http://localhost:3001/orders", { userId })
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <Container>
      <Grid container direction="column" sx={{ height: "auto", pt: 5, pb: 5 }}>
        <Grid item>
          <Typography variant="h3">Mis ordenes</Typography>
        </Grid>
        <Grid item container direction="column">
          {order?.map((order, index) => {
            return (
              <Grid item key={index}>
                <Order order={order}></Order>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Orders;
