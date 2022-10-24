import React, { useEffect, useContext, useReducer } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import AuthContext from "../../context/auth-context/AuthContext";
import ProductContext from "../../context/product-context/ProductContext";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";
import ProductFilters from "./components/ProductFilters";
import { catalogueActions } from "./catalogue-reducer/catalogueActions";
import { catalogueInitialState, CatalogueReducer } from "./catalogue-reducer/catalogueReducer";
import "./Catalogue.css";

/**
 * Componente que muestra el catalogo de productos
 */
function Catalogue() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, loadProducts, products, getWishlist } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(CatalogueReducer, catalogueInitialState);

  /**
   * Peticion a la API para obtener los productos de la categoria correspondiente.
   */
  useEffect(() => {
    loadProducts(category);
  }, []);

  useEffect(() => {
    if (auth) getWishlist();
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: catalogueActions.CHECK_OPTION,
      payload: { name: e.target.name, value: e.target.checked },
    });
  };

  /**
   * Filtra los productos de acuerdo a la seleccion del usuario
   */
  const filteredProducts = () => {
    const filtered = products.filter((product) => state[product[0].product_name]);

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
        <Grid item container justifyContent="center">
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
        <Grid item container columnSpacing={3}>
          <Grid item container xs={2} justifyContent="center">
            <Paper
              elevation={3}
              sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}
            >
              <Grid container direction="column" sx={{ width: "95%", height: "100%" }}>
                <Grid item sx={{ m: 0 }}>
                  <CustomTypography variant="h6" component="span">
                    Catalogo
                  </CustomTypography>
                </Grid>
                <Grid container item direction="column" rowSpacing={3} sx={{ m: 0 }}>
                  <ProductFilters check={state} handleChange={handleChange} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container xs={10} justifyContent="center" sx={{ pr: "16px" }}>
            <Paper
              elevation={3}
              sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ width: "95%", height: "100%", m: 0 }}
                spacing={2}
              >
                {filteredProducts().map((product, index) => (
                  <ProductItem key={index} product={product} addToCart={addToCart} />
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Catalogue;
