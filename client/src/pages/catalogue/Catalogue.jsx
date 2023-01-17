import { useEffect, useContext, useReducer } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import ProductItem from "./components/product-item/ProductItem";
import ProductContext from "../../context/product-context/ProductContext";
import Layout from "../../components/layout/Layout";
import ProductFilters from "./components/product-filters/ProductFilters";
import { catalogueActions } from "./reducer/catalogueActions";
import { catalogueInitialState, CatalogueReducer } from "./reducer/catalogueReducer";

/**
 * Component that shows the products by category.
 * @returns {JSX.Element} Component Catalogue.
 */
function Catalogue() {
  const { category } = useParams();

  const { loader, setLoader, addToCart, loadProducts, products, getWishlist } =
    useContext(ProductContext);

  const [state, dispatch] = useReducer(CatalogueReducer, catalogueInitialState);

  useEffect(() => {
    // Displays the loader every time the component is re-render.
    setLoader(true);

    // Gets the products by their category.
    loadProducts(category);
    getWishlist();
  }, [category]);

  const handleChange = (e) => {
    dispatch({
      type: catalogueActions.CHECK_OPTION,
      payload: { name: e.target.name, value: e.target.checked },
    });
  };

  /**
   * Filters all products based on the user's selection.
   */
  const filteredProducts = () => {
    const filtered = products.filter((product) => {
      // Gets all product's object keys to know which state is checked.
      // Product's object keys do not have the same name as the state's keys.
      const allKeys = Object.keys(product);
      // eslint-disable-next-line no-restricted-syntax
      for (const prop of allKeys) {
        if (prop === "min_price") {
          if (Boolean(product[prop]) === state[product[prop].toString()]) {
            return true;
          }
        } else if (Boolean(product[prop]) === state[product[prop]]) {
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
        sx={{ mt: "30px", mb: "30px", width: "70%" }}
      >
        <Grid item container columnSpacing={3}>
          <Grid
            component={Box}
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", md: "block", sm: "block" } }}
            justifyContent="center"
          >
            <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "center" }}>
              <Grid container direction="column" sx={{ width: "95%", height: "100%" }}>
                <Grid item sx={{ m: 0 }}>
                  <span>Catalogo</span>
                </Grid>
                <Grid container item direction="column" rowSpacing={3} sx={{ m: 0 }}>
                  <ProductFilters check={state} handleChange={handleChange} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={8}
            md={9}
            justifyContent="center"
            sx={{ minHeight: "700px" }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ width: "95%", height: "100%", m: 0 }}
                rowSpacing={2}
                columnSpacing={{ xs: 0, md: 2 }}
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
