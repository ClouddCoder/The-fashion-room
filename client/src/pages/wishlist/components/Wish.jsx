import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getProductImage } from "../../../assets";
import ProductContext from "../../../context/product-context/ProductContext";
import "./Wish.css";

function Wish({ product }) {
  const navigate = useNavigate();
  const { handleWish } = useContext(ProductContext);
  return (
    <Grid item container mt={4}>
      <Card sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <CardContent sx={{ width: "100%", display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120 }}
            image={getProductImage(product.product_name)}
            alt={product.product_name}
          />
          <div className="description">
            <h1>{product.product_name}</h1>
            <div>
              <p>${product.product_price}</p>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <div className="wishOptions">
            <Button
              variant="contained"
              onClick={() => navigate(`/product/${product.product_id}`)}
            >
              Comprar
            </Button>
            <Button variant="contained" onClick={() => handleWish(product, true)}>
              Remove
            </Button>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wish;
