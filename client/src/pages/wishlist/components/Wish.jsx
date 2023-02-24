import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getProductImage } from "../../../assets";
import ProductContext from "../../../context/product-context/ProductContext";
import "./Wish.css";

/**
 * Component to render the products in the wishlist of the user.
 * @param {object} { product } - product to show.
 * @returns {JSX.Element} - Wish component.
 */
function Wish({ product }) {
  const navigate = useNavigate();
  const { handleWish } = useContext(ProductContext);
  return (
    <Grid item>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          p: 1,
        }}
      >
        <Box sx={{ display: "flex", flex: { sm: 1 } }}>
          <CardMedia
            component="img"
            image={getProductImage(product.variant_name)}
            alt={product.variant_name}
            sx={{ width: "50%" }}
          />
          <CardContent sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div className="wish-description">
              <span className="wish__product-name">{product.product_name}</span>
              <span className="wish__product-price">${product.min_price}</span>
            </div>
          </CardContent>
        </Box>
        <Box
          component={CardActions}
          disableSpacing
          sx={{
            display: "flex",
            flexDirection: { sm: "column" },
            justifyContent: { sm: "space-around" },
            p: 0,
          }}
        >
          <Button onClick={() => navigate(`/product/${product.product_id}-${product.variant_id}`)}>
            Comprar
          </Button>
          <Button onClick={() => handleWish(product.product_id, true)}>Eliminar</Button>
        </Box>
      </Card>
    </Grid>
  );
}

export default Wish;
