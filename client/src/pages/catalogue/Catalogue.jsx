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
    <Grid container direction="column">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item={true} sx={{ height: "auto", pt: 10, pb: 20 }}>
        <Grid container component="div">
          <Grid item container justifyContent="center">
            <Button sx={{ mr: 1 }} component={Link} to="/" variant="outlined" color="primary">
              Regresar
            </Button>
            {customButton()}
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
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
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Catalogue;
