import React, { useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import AuthContext from "../../context/auth-context/AuthContext";
import ProductContext from "../../context/product-context/ProductContext";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import "./Catalogue.css";

/**
 * Componente que muestra el catalogo de productos
 */
function Catalogue() {
  const navigate = useNavigate();
  const { addToCart, loadProducts, products, getWishlist } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const [check, setCheck] = useState({
    blusa: false,
    camisa: false,
    corbata: false,
    pantalon: false,
    pantaloneta: false,
    zapatos: false,
  });

  const [query, setQuery] = useState("");

  /**
   * Ejecuta la funcion loadProducts() del contexto ProductContext
   */
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (auth) getWishlist();
  }, []);

  const handleChange = (e) => {
    setCheck({
      ...check,
      [e.target.name]: e.target.checked,
    });

    setQuery({
      ...query,
      [e.target.name]: e.target.checked ? e.target.name : "",
    });
  };

  const filteredProducts = () => {
    const filtered = products?.filter((product) => check[product.product_name.toLowerCase()]);

    if (filtered.length > 0) return filtered;

    return products;
  };

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

          {auth ? (
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              color="primary"
              onClick={() => navigate("/cart")}
            >
              Ir al carrito
            </Button>
          ) : (
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Ir al carrito
            </Button>
          )}
        </Grid>
        <Grid item container>
          <Grid item container xs={4} direction="column">
            <h1>Catalogo</h1>
            <Grid>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Categorías</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox checked={check.blusa} onChange={handleChange} name="blusa" />
                  }
                  label="Blusa"
                  sx={{ fontSize: 14 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={check.camisa} onChange={handleChange} name="camisa" />
                  }
                  label="Camisa"
                  sx={{ fontSize: 14 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={check.corbata} onChange={handleChange} name="corbata" />
                  }
                  label="Corbata"
                  sx={{ fontSize: 14 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={check.pantalon} onChange={handleChange} name="pantalon" />
                  }
                  label="Pantalon"
                  sx={{ fontSize: 14 }}
                />
                <FormControlLabel
                  control={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Checkbox
                      checked={check.pantaloneta}
                      onChange={handleChange}
                      name="pantaloneta"
                    />
                  }
                  label="Pantaloneta"
                  sx={{ fontSize: 14 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={check.zapatos} onChange={handleChange} name="zapatos" />
                  }
                  label="Zapatos"
                  sx={{ fontSize: 14 }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={8}
            spacing={4}
            sx={{ mt: "16px" }}
          >
            {filteredProducts().map((product) => (
              <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Catalogue;
