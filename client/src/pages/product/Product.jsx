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
  const { products, addToCart, addProductToBuy, clearListOfProductsToBuy } =
    useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const productId = parseInt(id, 10);
  const product = products.find((item) => item.product_id === productId);

  const handleBuyProduct = () => {
    addProductToBuy(product.product_id);
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
            alt={product.name}
            width="450px"
            height="450px"
          />
        </Grid>
        <Grid item container xs={6} direction="column" justifyContent="center">
          <Grid item>
            <h1>{product.product_name}</h1>
          </Grid>
          <Grid item>
            <span>{product.product_price}</span>
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
                onClick={auth ? () => addToCart(product.product_id) : () => navigate("/login")}
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
