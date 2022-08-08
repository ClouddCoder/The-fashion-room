import React, { useContext, useEffect } from "react";
import { Grid, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import ProductContext from "../context/product-context/ProductContext";
import AuthContext from "../context/auth-context/AuthContext";
import OrderResume from "../components/OrderResume";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function ShoppingCart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    getTotalProducts,
    getTotalPrice,
    totalProducts,
    totalPrice,
  } = useContext(ProductContext);

  const { userId } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getTotalProducts();
    getTotalPrice();
  }, []);

  const buyProducts = async () => {
    const res = await fetch("http://localhost:3001/cart", {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();
    console.log(data);
    navigate("/invoice");
  };

  const createInvoice = async () => {
    const res = await fetch("http://localhost:3001/invoice", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify("hola"),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <Navbar />
      <Container component="div" sx={{ height: "auto", width: "auto", mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item={true} container xs={6}>
            <Grid item container justifyContent="center">
              <Grid item>
                <Button
                  sx={{ width: 200, mr: 1 }}
                  component={Link}
                  to="/catalogue"
                  variant="outlined"
                >
                  Regresar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ width: 200, ml: 1 }}
                  onClick={() => clearCart()}
                  variant="outlined"
                >
                  Vaciar carrito
                </Button>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center" direction="column">
              {cart.map((product) => (
                <Grid item key={product.product_id}>
                  <CartItem product={product} removeFromCart={removeFromCart} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item={true} justifyContent="center" xs={6}>
            <OrderResume
              buyProducts={buyProducts}
              createInvoice={createInvoice}
              orderTotalProducts={totalProducts}
              orderTotalPrice={totalPrice}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default ShoppingCart;
