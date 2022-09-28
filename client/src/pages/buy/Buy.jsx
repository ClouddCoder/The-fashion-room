import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import ProductToBuy from "./components/ProductToBuy";
import Typography from "@mui/material/Typography";

function Buy() {
  const { productsToBuy } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  console.log(productsToBuy);
  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ width: "80%", m: "auto 0" }} spacing={2}>
        <Grid item={true} xs={8} container direction="column">
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Direccion de entrega
            </Typography>
            <Typography variant="body2">Diagonal 26h 73-11 Cali, Colombia</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Metodo de pago
            </Typography>
            <Typography variant="body2">Tarjeta de credito</Typography>
          </Grid>
          <Grid item container direction="column">
            {productsToBuy?.map((item, i) => (
              <ProductToBuy key={i} product={item} />
            ))}
          </Grid>
        </Grid>
        <Grid item={true} xs={4}>
          <Typography variant="h1" component="div" sx={{ fontSize: "16px" }}>
            Resumen
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Buy;
