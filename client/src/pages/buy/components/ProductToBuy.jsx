import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";
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
          <div className="description">
            <div>
              <CustomTypography variant="body2" sx={{ fontSize: "14px" }}>
                {product.product_name}
              </CustomTypography>
            </div>
            <div>
              <CustomTypography variant="body2" sx={{ fontSize: "14px" }}>
                ${product.variant_price}
              </CustomTypography>
            </div>
            <div>
              <CustomTypography variant="body2" sx={{ fontSize: "14px" }}>
                ${product.shipping_cost}
              </CustomTypography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProductToBuy;
