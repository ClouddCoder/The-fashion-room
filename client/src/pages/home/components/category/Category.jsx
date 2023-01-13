import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { style, phoneStyle } from "./style";

/**
 * Componente que muestra la categoria en el inicio de la pagina
 */
function Category({ alt, image, title, description }) {
  const cardSxProps = useMediaQuery("(min-width:600px)") ? style : phoneStyle;

  return (
    <Card sx={cardSxProps}>
      <CardActionArea component={Link} to={`/catalogue/${alt}`} sx={{ height: "230px" }}>
        <CardMedia component="img" alt={alt} height="140" src={image} />
        <CardContent>
          <h5>{title}</h5>
          <span>{description}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Category;
