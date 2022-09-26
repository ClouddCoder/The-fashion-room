import React, { useContext } from "react";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import { getProductImage } from "../../assets";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const productId = parseInt(id, 10);

  const product = products.find((product) => product.product_id === productId);
  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ width: "80%", m: "auto 0" }}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={getProductImage(product.product_name)}
            alt={product.name}
            width="450px"
            height="450px"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
        >
          <h1>{product.product_name}</h1>
          <p>{product.price}</p>
          <div style={{ display: "flex" }}>
            <button>Comprar</button>
            <button onClick={auth ? addToCart(product.product_id) : () => navigate("/login")}>
              Agregar al carrito
            </button>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Product;
