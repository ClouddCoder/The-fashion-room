import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AuthContext from "../../context/auth-context/AuthContext";
import InvoiceDetail from "./components/InvoiceDetail";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import axios from "axios";

/**
 * Componente que muestra las compras realizadas por el usuario
 */
function Orders() {
  const { userId } = useContext(AuthContext);
  const [orderDetail, setOrderDetail] = useState();

  /**
   * Peticion a la API para obtener la informacion de las compras realizadas por el usuario
   */
  const loadOrderDetail = async () => {
    axios
      .post("http://localhost:3050/api-server/order-detail", { userId })
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

  /**
   * Ejecuta la funcion loadOrderDetail()
   */
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
