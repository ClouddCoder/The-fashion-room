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
import CustomTypography from "../../commons/custom-typography/CustomTypography";
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
          <Grid item>
            <Button sx={{ mr: 1 }} component={Link} to="/" variant="outlined" color="primary">
              Regresar
            </Button>
          </Grid>
          <Grid item>
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
        </Grid>
        <Grid item container>
          <Grid item container xs={2} direction="column" spacing={3}>
            <Grid item>
              <CustomTypography variant="h4" component="span">
                Catalogo
              </CustomTypography>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Categorías</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="blusa"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Blusa</CustomTypography>}
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.camisa}
                      onChange={handleChange}
                      name="camisa"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Camisa</CustomTypography>}
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.corbata}
                      onChange={handleChange}
                      name="corbata"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Corbata</CustomTypography>}
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.pantalon}
                      onChange={handleChange}
                      name="pantalon"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Pantalon</CustomTypography>}
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.pantaloneta}
                      onChange={handleChange}
                      name="pantaloneta"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Pantaloneta</CustomTypography>}
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.zapatos}
                      onChange={handleChange}
                      name="zapatos"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label={<CustomTypography variant="body2">Zapatos</CustomTypography>}
                  sx={{ m: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Tallas</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="xs"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="XS"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="s"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="S"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="m"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="M"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="l"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="L"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="xl"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="XL"
                  sx={{ m: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Colores</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="rojo"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="Rojo"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="azul"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="Azul"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="verde"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="Verde"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.blusa}
                      onChange={handleChange}
                      name="amarillo"
                      size="small"
                      sx={{ p: "3px" }}
                    />
                  }
                  label="Amarillo"
                  sx={{ m: 0 }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Precio</FormLabel>
                <FormControlLabel control={<span />} label="Hasta $200.000" sx={{ m: 0 }} />
                <FormControlLabel control={<span />} label="$200.000 a $400.000" sx={{ m: 0 }} />
                <FormControlLabel control={<span />} label="Más de $400.000" sx={{ m: 0 }} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            xs={10}
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
