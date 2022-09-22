import React, { useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AuthContext from "../../../context/auth-context/AuthContext";
import ProductContext from "../../../context/product-context/ProductContext";
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

  const CustomFavIcon = ({ stateWish }) => {
    if (stateWish) {
      return <FavoriteIcon sx={{ color: "red" }} />;
    }

    return <FavoriteBorderIcon sx={{ "&:hover": { color: "red" } }} />;
  };

  const CustomWishlistButton = () => {
    const props = { position: "absolute", top: "10px", right: "10px" };
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
            sx={props}
          >
            <CustomFavIcon stateWish={addWish} />
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
            sx={props}
          >
            <CustomFavIcon stateWish={addWish} />
          </IconButton>
        );
      }
    } else {
      return (
        <IconButton component="span" onClick={() => navigate("/login")} sx={props}>
          <CustomFavIcon stateWish={addWish} />
        </IconButton>
      );
    }
  };

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
      <Card
        sx={{
          height: "100%",
          cursor: "pointer",
          transform: "scale(1,1)",
          transition: "transform 0.5s ease",
          "&:hover": { transform: "scale(1.1,1.1)" },
        }}
      >
        <CardActionArea
          sx={{ height: "100%" }}
          onClick={auth ? () => addToCart(product.product_id) : () => navigate("/login")}
        >
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
          <CustomWishlistButton />
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ProductItem;
