import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getProductImage } from "../../../../assets";
import CustomWishlistButton from "../CustomWishlistButton";
import { getMUIprops } from "../../../../utils/MUIMediaQuery";
import { phoneStyle, tabletStyle, desktopStyle } from "./ProductItemMUIStyle";
import "./ProductItem.css";

/**
 * Component to render the product card on the catalogue.
 * @param {object} { product } - product to show.
 * @returns {JSX.Element} - Product component.
 */
function ProductItem({ product }) {
  const navigate = useNavigate();

  let cardProps = {};

  cardProps = getMUIprops(phoneStyle, tabletStyle, desktopStyle, desktopStyle);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      sx={{
        position: "relative",
      }}
    >
      <Card
        sx={{
          width: "auto",
          height: "auto",
          cursor: "pointer",
          transform: "scale(1,1)",
          transition: "transform 0.5s ease",
          "&:hover": { transform: "scale(1.1,1.1)" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardActionArea
          sx={cardProps}
          onClick={() =>
            navigate(`/product/${product.product_id}-${product.variant_id}`)
          }
        >
          <CardMedia
            component="img"
            height="140"
            image={getProductImage(product.variant_name)}
            sx={{ width: "90%", height: "65%" }}
            alt={product.variant_name}
          />
          <CardContent
            sx={{
              p: "10px",
              width: "90%",
              heigth: "35%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
