import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { phoneStyle, desktopStyle } from "./style";

/**
 * Componente que muestra la categoria en el inicio de la pagina
 */
function Category({ alt, image, title }) {
  const cardProps = useMediaQuery("(min-width:600px)") ? desktopStyle : phoneStyle;

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
