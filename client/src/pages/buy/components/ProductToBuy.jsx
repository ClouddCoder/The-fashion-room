import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getProductImage } from "../../../assets";

function ProductToBuy({ product }) {
  return (
    <Grid item sx={{ maxHeight: "260px", position: "relative" }}>
      <Card sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <CardContent sx={{ width: "100%", display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120 }}
            image={getProductImage(product.product_name)}
            alt={product.product_name}
          />
          <div className="description">
            <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
              {product.product_name}
            </Typography>
            <div>
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                ${product.price}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductToBuy;
