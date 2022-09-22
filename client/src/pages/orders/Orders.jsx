import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
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
  const { token } = useContext(AuthContext);
  const [orderDetail, setOrderDetail] = useState([]);

  /**
   * Peticion a la API para obtener la informacion de las compras realizadas por el usuario.
   */
  const loadOrderDetail = () => {
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3050/api/order-detail", config)
      .then((response) => setOrderDetail(response.data))
      .catch((err) => console.log(err));
  };

  /**
   * Separa las compras por el id de la factura.
   */
  const setGroupOrderDetail = (response) => {
    const groupsOrderDetail = Object.values(
      response.data.reduce(
        (acc, item) => ({
          ...acc,
          [item.invoice_id]: (acc[item.invoice_id] || []).concat(item),
        }),
        {},
      ),
    );
  };

  /**
   * Ejecuta la funcion loadOrderDetail()
   */
  useEffect(() => {
    loadOrderDetail();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container direction="column" sx={{ height: "auto", width: "60%", m: 2 }}>
        <Grid item>
          <Typography variant="h3">Mis ordenes</Typography>
        </Grid>
        <Grid item container direction="column" mt={4}>
          {orderDetail?.map((order, i) => (
            <InvoiceDetail groupItems={order} key={i} />
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Orders;
