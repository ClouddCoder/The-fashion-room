import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import ProductToBuy from "./components/ProductToBuy";
import "./Buy.css";

function Buy() {
  const navigate = useNavigate();
  const { productsToBuy, createInvoice } = useContext(ProductContext);
  const { token } = useContext(AuthContext);
  const spanProps = {
    variant: "body2",
    component: "span",
    sx: { display: "block", m: "8px 0" },
  };
  const subtitleProps = { variant: "subtitle1", sx: { fontWeight: "bold" } };

  /**
   * Peticion a la API para actualizar un producto despues de una compra
   */
  // eslint-disable-next-line consistent-return
  const buyProducts = async () => {
    const res = await fetch("http://localhost:3050/api/cart", {
      method: "PUT",
      body: JSON.stringify(productsToBuy),
      headers: new Headers({
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      navigate("/invoice");
    } else {
      return data.message;
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ width: "80%", m: "auto 0" }} spacing={2}>
        <Grid item={true} xs={8} container direction="column" spacing={2}>
          <Grid item>
            <Card>
              <CardContent>
                <Typography {...subtitleProps}>Direccion de entrega</Typography>
                <Typography {...spanProps}>Diagonal 26h 73-11 Cali, Colombia</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography {...subtitleProps}>Metodo de pago</Typography>
                <Typography {...spanProps}>Tarjeta de credito</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            {productsToBuy?.map((item, i) => (
              <ProductToBuy key={i} product={item} />
            ))}
          </Grid>
        </Grid>
        <Grid item={true} xs={4}>
          <Card>
            <CardContent>
              <Typography {...subtitleProps}>Resumen</Typography>
              <div className="resume">
                <Typography {...spanProps}>Coste total de los productos</Typography>
                <Typography {...spanProps}>$ 80000</Typography>
              </div>
              <div className="resume">
                <Typography {...spanProps}>Código del cupon</Typography>
                <Typography {...spanProps}>4A5S12</Typography>
              </div>
              <div className="resume">
                <Typography {...spanProps}>Total de envío</Typography>
                <Typography {...spanProps}>$ 1000</Typography>
              </div>
              <Divider sx={{ m: "8px 0" }} />
              <div className="resume">
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight: "bold", m: "8px 0" }}
                >
                  Total
                </Typography>
                <Typography {...spanProps}>$ 81000</Typography>
              </div>
              <Button
                variant="contained"
                sx={{ width: "100%", borderRadius: "10px", m: "8px 0" }}
                onClick={() => {
                  buyProducts();
                  createInvoice(productsToBuy);
                }}
              >
                Realizar pedido
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Buy;
