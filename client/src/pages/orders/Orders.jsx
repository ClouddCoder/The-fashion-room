import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import InvoiceDetail from "./components/InvoiceDetail";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra las compras realizadas por el usuario
 */
function Orders() {
  const { loadOrderDetail, myOrders } = useContext(ProductContext);

  /**
   * Obtiene las compras realizadas por el usuario.
   */
  useEffect(() => {
    loadOrderDetail();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container direction="column" sx={{ height: "auto", width: "60%", m: 2 }}>
        <Grid item>
          <CustomTypography variant="h3">Mis ordenes</CustomTypography>
        </Grid>
        <Grid item container direction="column" mt={4}>
          {myOrders?.map((order, i) => (
            <InvoiceDetail product={order} key={i} />
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Orders;
