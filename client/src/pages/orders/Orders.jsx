import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductContext from "../../context/product-context/ProductContext";
import InvoiceDetail from "./components/InvoiceDetail";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra las compras realizadas por el usuario
 */
function Orders() {
  const { loadProducts, loadOrderDetail, myOrders } = useContext(ProductContext);

  /**
   * Obtiene las compras realizadas por el usuario.
   */
  useEffect(() => {
    loadOrderDetail();
  }, []);

  /**
   * Carga los productos de la base de datos para que el usuario
   * pueda volver a comprar alguno de los productos.
   */
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container direction="column" sx={{ height: "auto", width: "60%", m: 2 }}>
        <Grid item>
          <Typography variant="h3">Mis ordenes</Typography>
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
