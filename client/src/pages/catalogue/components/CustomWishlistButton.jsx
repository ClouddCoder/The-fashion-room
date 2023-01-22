import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CustomFavIcon from "./CustomFavIcon";
import AuthContext from "../../../context/auth-context/AuthContext";
import ProductContext from "../../../context/product-context/ProductContext";

/**
 * Component to render the custom wishlist button.
 * @param {object} { product } - Product to add or remove from wishlist.
 * @returns {JSX.Element} - CustomWishlistButton component.
 */
function CustomWishlistButton({ product }) {
  const { auth } = useContext(AuthContext);
  const { wishlist, handleWish } = useContext(ProductContext);
  const props = {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "white",
    opacity: "0.8",
  };

  // Verifies if product is in wishlist.
  const findWish = wishlist.find((wish) => wish.product_id === product.product_id);
  const productAsWish = Boolean(findWish);

  const [addWish, setAddWish] = useState(productAsWish);

  const navigate = useNavigate();

  // Sets initial state every time productAsWish changes.
  useEffect(() => {
    setAddWish(productAsWish);
  }, [productAsWish]);

  if (auth) {
    //  If the product is in the wishlist, the button gets red color
    // and can remove the product.
    if (addWish) {
      return (
        <IconButton
          component="span"
          onClick={() => {
            handleWish(product.product_id, true);
            setAddWish(false);
          }}
          sx={props}
        >
          <CustomFavIcon stateWish={addWish} />
        </IconButton>
      );
    }

    // If the product is not in the wishlist. the button does not have color
    // and can add the product.
    return (
      <IconButton
        aria-label={product.product_name}
        component="span"
        onClick={() => {
          handleWish(product.product_id);
          setAddWish(true);
        }}
        sx={props}
      >
        <CustomFavIcon stateWish={addWish} />
      </IconButton>
    );
  }

  return (
    <IconButton component="span" onClick={() => navigate("/login")} sx={props}>
      <CustomFavIcon stateWish={addWish} />
    </IconButton>
  );
}

export default CustomWishlistButton;
