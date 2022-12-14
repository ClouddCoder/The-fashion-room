import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ProductContext from "../../context/product-context/ProductContext";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import { getProductImage } from "../../assets";
import "./Product.css";

/**
 * Componente que renderiza la informacion de un producto
 * con las opciones de comprarlo o agregarlo al carrito
 */
function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productInfo = id.split("-");
  const productId = parseInt(productInfo[0], 10);
  const productVariantId = parseInt(productInfo[1], 10);
  const {
    variants,
    variantId,
    addToCart,
    addProductToBuy,
    clearListOfProductsToBuy,
    getProductVariants,
    setVariantId,
  } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const product = variants.find((item) => item.variant_id === variantId) || [];

  /**
   * Event delegation to handle the click on the variants.
   */
  const handleChange = (e) => {
    if (e.target.matches(".product-color div") || e.target.matches(".product-color span")) {
      const parent = e.target.closest("li");
      setVariantId(parent.getAttribute("name"));
    } else if (e.target.matches(".product-color")) {
      setVariantId(e.target.getAttribute("name"));
    }
  };

  const handleBuyProduct = () => {
    addProductToBuy(variantId);
    navigate("/buy");
  };

  // Gets the product's variants information.
  useEffect(() => {
    getProductVariants(productId);
  }, []);

  // The variant that is fetched with the product will be the default one
  // to check the variant's color button.
  useEffect(() => {
    setVariantId(productVariantId);
  }, []);

  useEffect(() => {
    clearListOfProductsToBuy();
  }, []);

  return (
    <Layout>
      <Grid container sx={{ width: "80%", m: "auto 0" }}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={getProductImage(product.variant_name)}
            alt={product.variant_name}
            width="450px"
            height="450px"
          />
        </Grid>
        <Grid item container xs={6} direction="column" justifyContent="center">
          <Grid item>
            <CustomTypography variant="h4">{product.product_name}</CustomTypography>
          </Grid>
          <Grid item>
            <CustomTypography variant="body2">{product.variant_price}</CustomTypography>
          </Grid>
          <Grid item>
            <CustomTypography variant="body2">Color:</CustomTypography>
          </Grid>
          <Grid item>
            <ul className="product-variant-colors">
              {variants?.map((variant, index) => (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  name={variant.variant_id}
                  className={`product-color${
                    variantId === variant.variant_id ? " selected" : ""
                  }`}
                  key={index}
                  onClick={handleChange}
                >
                  <div>
                    <span>{variant.color_value}</span>
                  </div>
                </li>
              ))}
            </ul>
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
                onClick={auth ? () => addToCart(variantId) : () => navigate("/login")}
              >
                Agregar al carrito
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Product;
