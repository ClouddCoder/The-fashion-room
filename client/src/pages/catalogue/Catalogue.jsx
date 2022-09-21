import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import AuthContext from "../../context/auth-context/AuthContext";
import ProductContext from "../../context/product-context/ProductContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import axios from "axios";
import "./Catalogue.css";

/**
 * Componente que muestra el catalogo de productos
 */
function Catalogue() {
  const { addToCart, loadProducts, products } = useContext(ProductContext);
  const { auth, token } = useContext(AuthContext);

  /**
   * Boton personalizado para agregar productos al carrito dependiendo del estado de la autenticacion global del usuario
   */
  const customButton = () => {
    if (auth) {
      return (
        <Button sx={{ ml: 1 }} component={Link} to="/cart" variant="outlined" color="primary">
          Ir al carrito
        </Button>
      );
    } else {
      return (
        <Button sx={{ ml: 1 }} component={Link} to="/login" variant="outlined" color="primary">
          Ir al carrito
        </Button>
      );
    }
  };

  /**
   * Agrega un producto a la tabla wishlist de la base de datos
   */
  const addToWishlist = async (product, remove = false) => {
    try {
      await axios.post(
        "http://localhost:3050/api/set-wishlist",
        {
          productId: product.product_id,
          remove,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      return console.log(error);
    }
  };

  /**
   * Ejecuta la funcion loadProducts() del contexto ProductContext
   */
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ pt: 10, pb: 10, width: "80%" }}
      >
        <Grid item container justifyContent="center" spacing={2}>
          <Button sx={{ mr: 1 }} component={Link} to="/" variant="outlined" color="primary">
            Regresar
          </Button>
          {customButton()}
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
          spacing={4}
          sx={{ mt: "16px" }}
        >
          {products?.map((product) => (
            <ProductItem
              key={product.product_id}
              product={product}
              addToCart={addToCart}
              addWishlist={addToWishlist}
            />
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Catalogue;
