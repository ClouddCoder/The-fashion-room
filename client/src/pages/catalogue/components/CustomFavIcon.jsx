import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function CustomFavIcon({ stateWish }) {
  if (stateWish) {
    return <FavoriteIcon sx={{ color: "var(--color-primary-red)" }} />;
  }

  return <FavoriteBorderIcon sx={{ "&:hover": { color: "var(--color-primary-red)" } }} />;
}

export default CustomFavIcon;
