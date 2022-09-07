import React, { useContext } from "react";
import AuthContext from "../../../context/auth-context/AuthContext";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

/**
 * Componente que muestra el producto en el catalogo
 */
function ProductItem({ product, addToCart, addWishlist }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const customCartButton = () => {
    if (auth) {
      return (
        <Button variant="outlined" onClick={() => addToCart(product.product_id)}>
          Agregar al carrito
        </Button>
      );
    } else {
      return (
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Agregar al carrito
        </Button>
      );
    }
  };

  const customWishlistButton = () => {
    if (auth) {
      return (
        <Button variant="outlined" onClick={() => addWishlist(product)}>
          Wishlist
        </Button>
      );
    } else {
      return (
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Wishlist
        </Button>
      );
    }
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "140px",
    maxHeight: "140px",
  });

  return (
    <Box m={1}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
        }}
        elevation={1}
      >
        <Grid container spacing={2}>
          <Grid item={true} sx={{ width: 160, height: 160 }}>
            <Img
              alt="complex"
              src={require(`../../../assets/products/${product.product_name}.png`)}
            />
          </Grid>
          <Grid item={true} xs={12} sm container>
            <Grid item={true} xs container direction="column" spacing={2}>
              <Grid item={true} xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad disponible {product.stock}
                </Typography>
              </Grid>
              <Grid item>{customWishlistButton()}</Grid>
              <Grid item>{customCartButton()}</Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductItem;
