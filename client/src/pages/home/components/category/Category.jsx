import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { getMUIprops } from "../../../../utils/MUIMediaQuery";
import { phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle } from "./CategoryMUIStyle";

/**
 * Componente que muestra la categoria en el inicio de la pagina
 */
function Category({ alt, image, title }) {
  let cardProps = {};

  cardProps = getMUIprops(phoneStyle, tabletStyle, desktopStyle, largeDevicesStyle);

  return (
    <Card sx={{ height: "auto", width: "auto", display: "flex", justifyContent: "center" }}>
      <CardActionArea component={Link} to={`/catalogue/${alt}`} sx={cardProps}>
        <CardMedia component="img" alt={alt} src={image} />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <span className="category__title">{title}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Category;
