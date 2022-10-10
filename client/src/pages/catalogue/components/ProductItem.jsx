import React /* useState, useContext, useEffect */ from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getProductImage } from "../../../assets";
import CustomWishlistButton from "./sub-components/CustomWishlistButton";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";

/**
 * Componente que muestra el producto en el catalogo
 */
function ProductItem({ product }) {
  const navigate = useNavigate();

  return (
    <Grid item xs={6} md={4} sx={{ height: "260px", maxHeight: "260px", position: "relative" }}>
      <Card
        sx={{
          "height": "100%",
          "cursor": "pointer",
          "transform": "scale(1,1)",
          "transition": "transform 0.5s ease",
          "&:hover": { transform: "scale(1.1,1.1)" },
        }}
      >
        <CardActionArea
          sx={{ height: "100%" }}
          onClick={() => navigate(`/product/${product.product_id}`)}
        >
          <CardMedia
            component="img"
            height="140"
            image={getProductImage(product.product_name)}
            alt={product.product_name}
          />
          <CardContent sx={{ p: "10px" }}>
            <CustomTypography gutterBottom variant="h5" sx={{ fontSize: "16px" }}>
              {product.product_name}
            </CustomTypography>
            <CustomTypography variant="body2" color="text.secondary">
              Cantidad disponible {product.stock}
            </CustomTypography>
          </CardContent>
        </CardActionArea>
        <CustomWishlistButton product={product} />
      </Card>
    </Grid>
  );
}

export default ProductItem;
