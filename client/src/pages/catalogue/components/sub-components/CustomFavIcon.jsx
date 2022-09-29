import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function CustomFavIcon({ stateWish }) {
  if (stateWish) {
    return <FavoriteIcon sx={{ color: "red" }} />;
  }

  return <FavoriteBorderIcon sx={{ "&:hover": { color: "red" } }} />;
}

export default CustomFavIcon;
