import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
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
  const { auth } = useContext(AuthContext);
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
            <h4>{product.product_name}</h4>
          </Grid>
          <Grid item>
            <span>{product.variant_price}</span>
          </Grid>
          <Grid item>
            <span>Color:</span>
          </Grid>
          <Grid item>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <ul className="product-variant-colors" onClick={changeButtonBorderColor}>
              {variants?.map((variant, index) => (
                <li
                  name={variant.variant_id}
                  className={`product-color${
                    variantId === variant.variant_id ? " selected" : ""
                  }`}
                  key={index}
                >
                  <span>{variant.color_value}</span>
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
                onClick={
                  auth
                    ? () => addProductToCart({ variantId, quantityToPurchase: 1 })
                    : () => navigate("/login")
                }
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
