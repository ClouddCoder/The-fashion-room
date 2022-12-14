import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import CustomTypography from "../../../../components/custom-typography/CustomTypography";
import { style, phoneStyle, font, phoneFont } from "./style";

/**
 * Componente que muestra la categoria en el inicio de la pagina
 */
function Category({ alt, image, title, description }) {
  const cardSxProps = useMediaQuery("(min-width:600px)") ? style : phoneStyle;
  const fontSize = useMediaQuery("(min-width:600px)") ? font : phoneFont;

  return (
    <Card sx={cardSxProps}>
      <CardActionArea component={Link} to={`/catalogue/${alt}`} sx={{ height: "230px" }}>
        <CardMedia component="img" alt={alt} height="140" src={image} />
        <CardContent>
          <CustomTypography gutterBottom variant="h5" component="h2" sx={fontSize}>
            {title}
          </CustomTypography>
          <CustomTypography variant="body2" color="textSecondary" component="p">
            {description}
          </CustomTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Category;
