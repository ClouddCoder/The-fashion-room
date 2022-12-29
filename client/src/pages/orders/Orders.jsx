import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import InvoiceDetail from "./components/InvoiceDetail";
import Layout from "../../components/layout/Layout";

/**
 * Componente que muestra las compras realizadas por el usuario
 */
function Orders() {
  const { loadOrderDetail, myOrders, clearProductsList } = useContext(ProductContext);

  useEffect(() => {
    // Clears the products list to avoid duplicates
    // when the user wants to buy the product again.
    clearProductsList();
    // Gets the orders made by the user.
    loadOrderDetail();
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
}

export default Orders;
