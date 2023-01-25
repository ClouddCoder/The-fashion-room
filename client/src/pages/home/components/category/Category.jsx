import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { getMUIprops } from "../../../../utils/MUIMediaQuery";
import { phoneStyle, tabletStyle, desktopStyle } from "./CategoryMUIStyle";

/**
 * Component to render the category.
 * @param {object} { alt, image, title } - props to render the category.
 * @returns {JSX.Element} - Category component.
 */
function Category({ alt, image, title }) {
  let cardProps = {};

  cardProps = getMUIprops(phoneStyle, tabletStyle, desktopStyle, desktopStyle);

  return (
    <Card sx={{ height: "auto", width: "auto", display: "flex", justifyContent: "center" }}>
      <CardActionArea component={Link} to={`/catalogue/${alt}`} sx={cardProps}>
        <CardMedia component="img" alt={alt} src={image} sx={{ width: "90%", height: "65%" }} />
        <CardContent sx={{ display: "flex", justifyContent: "center", height: "35%" }}>
          <span className="category__title">{title}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Category;
