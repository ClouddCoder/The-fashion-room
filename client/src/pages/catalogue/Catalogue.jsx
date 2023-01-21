import { useEffect, useContext, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import ProductItem from "./components/product-item/ProductItem";
import ProductContext from "../../context/product-context/ProductContext";
import Layout from "../../components/layout/Layout";
import ProductFilters from "./components/product-filters/ProductFilters";
import { catalogueActions } from "./reducer/catalogueActions";
import { catalogueInitialState, CatalogueReducer } from "./reducer/catalogueReducer";
import Modal from "../../components/modal/Modal";
import "./Catalogue.css";

/**
 * Component that shows the products by category.
 * @returns {JSX.Element} Component Catalogue.
 */
function Catalogue() {
  const { category } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const { loader, setLoader, addProductToCart, loadProducts, products, getWishlist } =
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

  const categoryInUpperCase = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Layout>
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid
        container
        direction={{ xs: "column", sm: "row", md: "row" }}
        justifyContent="center"
        sx={{ width: "90%", maxWidth: "1000px", p: 2 }}
        columnSpacing={{ xs: 0, sm: 2 }}
      >
        <Grid
          component={Box}
          item
          sm={4}
          md={3}
          sx={{ display: { xs: "none", md: "block", sm: "block" } }}
        >
          <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item sx={{ m: 0 }}>
                <span className="catalogue-title">{categoryInUpperCase}</span>
              </Grid>
              <Grid container item direction="column" rowSpacing={3}>
                <ProductFilters check={state} handleChange={handleChange} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container sm={8} md={9}>
          <Grid
            item
            sx={{
              display: { xs: "flex", sm: "none" },
              flexDirection: "row-reverse",
              width: "100%",
            }}
          >
            <Button onClick={() => setOpenModal(true)}>Filtrar</Button>
          </Grid>
          <Grid item justifyContent="center">
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
                  <ProductItem key={index} product={product} addToCart={addProductToCart} />
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Modal state={openModal}>
        <Grid container direction="column" rowSpacing={2} sx={{ p: 2 }}>
          <Grid item container direction="column" rowSpacing={3} sx={{ m: 0 }}>
            <ProductFilters check={state} handleChange={handleChange} />
          </Grid>
          <Grid item>
            <Button color="secondary" fullWidth onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Layout>
  );
}

export default Catalogue;
