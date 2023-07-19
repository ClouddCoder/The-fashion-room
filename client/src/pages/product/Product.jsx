import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import { getProductImage } from "../../assets";
import "./Product.css";

/**
 * Component to render the product's information.
 * @returns {JSX.Element} - Product component.
 */
function Product() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const productInfo = id.split("-");
  const productId = parseInt(productInfo[0], 10);
  const productVariantId = parseInt(productInfo[1], 10);

  const {
    variants,
    variantId,
    addProductToCart,
    addProductToBuy,
    clearListOfProductsToBuy,
    getProductVariants,
    setVariantId,
  } = useContext(ProductContext);

  const product = variants.find((item) => item.variant_id === variantId) || [];

  /**
   * Event delegation to change the color of the variant's button border.
   */
  const changeButtonBorderColor = (e) => {
    if (e.target.matches(".product-color")) {
      setVariantId(e.target.getAttribute("name"));
    }

    const parent = e.target.closest("li");
    setVariantId(parent.getAttribute("name"));
  };

  const handleBuyProduct = () => {
    addProductToBuy(variantId);
    navigate("/buy");
  };

  useEffect(() => {
    // Gets the product's variants information.
    getProductVariants(productId);

    // The variant that is fetched with the product will be the default one.
    setVariantId(productVariantId);

    clearListOfProductsToBuy();
  }, []);

  return (
    <Layout>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "90%", maxWidth: "700px", p: 2 }}
      >
        <Grid
          component={Box}
          item
          container
          sm={6}
          justifyContent="center"
          alignItems="center"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <img
            className="product-image"
            src={getProductImage(product.variant_name)}
            alt={product.variant_name}
          />
        </Grid>
        <Grid
          item
          container
          sm={6}
          direction="column"
          justifyContent="center"
          rowSpacing={1}
        >
          <Grid item>
            <span className="product-name-field">{product.product_name}</span>
          </Grid>
          <Grid
            item
            component={Box}
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="product-image"
              src={getProductImage(product.variant_name)}
              alt={product.variant_name}
            />
          </Grid>
          <Grid item className="product-price-field">
            <span>{`$${product.variant_price}`}</span>
          </Grid>
          <Grid item>
            <span>Color:</span>
          </Grid>
          <Grid item>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <ul
              className="product-variant-colors"
              onClick={changeButtonBorderColor}
            >
              {variants?.map((variant, index) => {
                // Only renders the colors of the current product.
                if (variant.product_id !== productId) {
                  return null;
                }

                return (
                  <li
                    name={variant.variant_id}
                    className={`product-color${
                      variantId === variant.variant_id ? " selected" : ""
                    }`}
                    key={index}
                  >
                    <span>{variant.color_value}</span>
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Grid item container direction="column" rowSpacing={1}>
            <Grid item>
              <Button
                variant="contained"
                onClick={auth ? handleBuyProduct : () => navigate("/login")}
                fullWidth
              >
                Comprar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={
                  auth
                    ? () =>
                        addProductToCart({ variantId, quantityToPurchase: 1 })
                    : () => navigate("/login")
                }
                fullWidth
              >
                Agregar al carrito
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Product;
