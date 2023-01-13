import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { getProductImage } from "../../../assets";

function ProductToBuy({ product }) {
  return (
    <Grid item sx={{ maxHeight: "260px", position: "relative" }}>
      <Card sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <CardContent sx={{ width: "100%", display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120 }}
            image={getProductImage(product.variant_name)}
            alt={product.variant_name}
          />
          <div className="product-description">
            <div>
              <span>{product.product_name}</span>
            </div>
            <div>
              <span>${product.variant_price}</span>
            </div>
            <div>
              <span>${product.shipping_cost}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductToBuy;
