import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * Component to render the custom favorite icon.
 * @param {object} { stateWish } - It is used to know if the product is in the wishlist.
 * @returns
 */
function CustomFavIcon({ stateWish }) {
  if (stateWish) {
    return <FavoriteIcon sx={{ color: "var(--color-primary-red)" }} />;
  }

  return <FavoriteBorderIcon sx={{ "&:hover": { color: "var(--color-primary-red)" } }} />;
}

export default CustomFavIcon;
