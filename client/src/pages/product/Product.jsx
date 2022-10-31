import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import { getProductImage } from "../../assets";

/**
 * Componente que renderiza la informacion de un producto
 * con las opciones de comprarlo o agregarlo al carrito
 */
function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const variantId = parseInt(id, 10);
  const { products, addToCart, addProductToBuy, clearListOfProductsToBuy, getProduct } =
    useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const product = products.find((item) => item.variant_id === variantId) || [];

  // Gets the product information.
  useEffect(() => {
    getProduct(id);
  }, []);

  const handleBuyProduct = () => {
    addProductToBuy(product.variant_id);
    navigate("/buy");
  };

  useEffect(() => {
    clearListOfProductsToBuy();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ width: "80%", m: "auto 0" }}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={getProductImage(product.product_name)}
            alt={product.product_name}
            width="450px"
            height="450px"
          />
        </Grid>
        <Grid item container xs={6} direction="column" justifyContent="center">
          <Grid item>
            <h1>{product.product_name}</h1>
          </Grid>
          <Grid item>
            <span>{product.variant_price}</span>
          </Grid>
          <Grid item>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={auth ? handleBuyProduct : () => navigate("/login")}
              >
                Comprar
              </Button>
              <Button
                variant="contained"
                onClick={auth ? () => addToCart(product.variant_id) : () => navigate("/login")}
              >
                Agregar al carrito
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Product;
