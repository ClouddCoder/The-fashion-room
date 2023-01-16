import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getProductImage } from "../../../../assets";
import CustomWishlistButton from "../CustomWishlistButton";
import { getMUIprops } from "../../../../utils/MUIMediaQuery";
import { phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle } from "./ProductItemMUIStyle";
import "./ProductItem.css";

/**
 * Componente que muestra el producto en el catalogo
 */
function ProductItem({ product }) {
  const navigate = useNavigate();

  let cardProps = {};

  cardProps = getMUIprops(phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle);

  return (
    <Grid
      item
      xs={12}
      md={5}
      lg={3}
      sx={{
        position: "relative",
      }}
    >
      <Card
        sx={{
          "width": "auto",
          "height": "auto",
          "cursor": "pointer",
          "transform": "scale(1,1)",
          "transition": "transform 0.5s ease",
          "&:hover": { transform: "scale(1.1,1.1)" },
          "display": "flex",
          "justifyContent": "center",
        }}
      >
        <CardActionArea
          sx={cardProps}
          onClick={() => navigate(`/product/${product.product_id}-${product.variant_id}`)}
        >
          <CardMedia
            component="img"
            height="140"
            image={getProductImage("zapatos")}
            alt={product.variant_name}
          />
          <CardContent sx={{ p: "10px" }}>
            <span id="card__product-name">{product.product_name}</span>
            <span id="card__product-price">{`$${product.min_price}`}</span>
          </CardContent>
        </CardActionArea>
        <CustomWishlistButton product={product} />
      </Card>
    </Grid>
  );
}

export default ProductItem;
