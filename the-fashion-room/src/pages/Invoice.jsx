import React, { useContext } from "react";
import ProductContext from "../context/product-context/ProductContext";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Box } from "@mui/system";

function Invoice() {
  const { cart, totalPrice, clearCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const ColorWhiteLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        width: "100%",
      }}
    />
  );

  return (
    <div>
      <Navbar />
      <Box component="div" sx={{ height: 400, mt: 5, mb: 5 }}>
        <Container>
          <Paper
            sx={{
              p: 2,
              bgcolor: "info.main",
              margin: "auto",
              height: "auto",
              width: "500px",
            }}
            elevation={1}
          >
            <Grid container direction="column">
              <Grid item container justifyContent="center" mt={2} mb={2}>
                <Typography variant="h3" component="div">
                  Detalles de la compra
                </Typography>
                <Typography variant="h6" component="div">
                  Num factura
                </Typography>
              </Grid>
              <Grid
                item
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" component="div">
                  Productos
                </Typography>
                <Grid item container direction="column">
                  {cart.map((product) => (
                    <Grid
                      item
                      container
                      key={product.product_id}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6" component="div">
                        {product.product_name} x{product.quantityInCart}
                      </Typography>
                      <Typography variant="h6" component="div">
                        ${product.price}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item container justifyContent="center">
                <ColorWhiteLine color="white" />
              </Grid>
              <Grid
                item
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" component="div">
                  Total
                </Typography>
                <Typography variant="h5" component="div">
                  ${totalPrice}
                </Typography>
              </Grid>
              <Grid item align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    navigate("/catalogue");
                    clearCart();
                  }}
                >
                  Seguir comprando
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

export default Invoice;
