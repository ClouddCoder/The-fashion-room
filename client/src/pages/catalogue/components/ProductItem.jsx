import React, { useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import AuthContext from "../../../context/auth-context/AuthContext";
import ProductContext from "../../../context/product-context/ProductContext";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Blusa, Camisa, Corbata, Pantalon, Pantaloneta, Zapatos } from "../../../assets";

/**
 * Componente que muestra el producto en el catalogo
 */
function ProductItem({ product, addToCart, addWishlist }) {
  const { auth } = useContext(AuthContext);
  const { temporaryWishlist, addTemporaryWish, removeTemporaryWish } =
    useContext(ProductContext);

  // Verifica si el producto esta en la wishlist
  const findWish = temporaryWishlist.find((wish) => wish.product_id === product.product_id);
  const productAsWish = Boolean(findWish);

  const [addWish, setAddWish] = useState(productAsWish || false);
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
      // Si el producto esta en la wishlist, el boton cambia de color
      // y puede ser removido de la wishlist
      if (addWish) {
        return (
          <IconButton
            component="span"
            onClick={() => {
              addWishlist(product, true);
              removeTemporaryWish(product.product_id);
              setAddWish(false);
            }}
            sx={{ backgroundColor: "blue", position: "absolute", top: "10px", right: "10px" }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        );
        // Si el producto no esta en la wishlist, el boton no tiene color y
        // puede agrega el producto de la wishlist
      } else {
        return (
          <IconButton
            component="span"
            onClick={() => {
              addWishlist(product);
              addTemporaryWish(product);
              setAddWish(true);
            }}
            sx={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        );
      }
    } else {
      return (
        <IconButton
          component="span"
          onClick={() => navigate("/login")}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      );
    }
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "140px",
    maxHeight: "140px",
  });

  /**
   * Obtiene la imagen del producto dependiendo de su nombre
   */
  const getProductImage = (productName) => {
    switch (productName) {
      case "Blusa":
        return Blusa;
      case "Camisa":
        return Camisa;
      case "Corbata":
        return Corbata;
      case "Pantalon":
        return Pantalon;
      case "Pantaloneta":
        return Pantaloneta;
      case "Zapatos":
        return Zapatos;
      default:
        return null;
    }
  };

  return (
    <Grid item xs={6} md={4} sx={{ height: "260px", maxHeight: "260px", position: "relative" }}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            height="140"
            image={getProductImage(product.product_name)}
            alt={product.product_name}
          />
          <CardContent sx={{ p: "10px" }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "16px" }}>
              {product.product_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cantidad disponible {product.stock}
            </Typography>
          </CardContent>
          {customWishlistButton()}
        </CardActionArea>
      </Card>
      {/*<Grid item={true} sx={{ width: 160, height: 160 }} xs={6}>
        <Img alt="complex" src={getProductImage(product.product_name)} />
      </Grid>
      <Grid item={true} xs={6} sm container>
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
      </Grid>*/}
    </Grid>
  );
}

export default ProductItem;
