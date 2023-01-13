import { useEffect, useContext, useReducer } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import AuthContext from "../../context/auth-context/AuthContext";
import ProductContext from "../../context/product-context/ProductContext";
import Layout from "../../components/layout/Layout";
import ProductFilters from "./components/ProductFilters";
import { catalogueActions } from "./reducer/catalogueActions";
import { catalogueInitialState, CatalogueReducer } from "./reducer/catalogueReducer";

/**
 * This component renders all products by category or filtered the
 * user selection.
 */
function Catalogue() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { loader, setLoader, addToCart, loadProducts, products, getWishlist } =
    useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(CatalogueReducer, catalogueInitialState);

  useEffect(() => {
    // Displays the loader every time the component is re-render.
    setLoader(true);

    // Gets the products by their category.
    loadProducts(category);
    getWishlist();
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: catalogueActions.CHECK_OPTION,
      payload: { name: e.target.name, value: e.target.checked },
    });
  };

  /**
   * Filters all products according with the user selection.
   */
  const filteredProducts = () => {
    const filtered = products.filter((product) => {
      // Gets all product's object keys to know which state is checked.
      // Product's object keys do not have the same name as the state's keys.
      const allKeys = Object.keys(product);
      // eslint-disable-next-line no-restricted-syntax
      for (const item of allKeys) {
        if (Boolean(product[item]) === state[product[item]]) {
          return true;
        }
      }
      return false;
    });

    if (filtered.length > 0) return filtered;

    return products;
  };

  return (
    <Layout>
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

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
                  <h6>Catalogo</h6>
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
    </Layout>
  );
}

export default Catalogue;
