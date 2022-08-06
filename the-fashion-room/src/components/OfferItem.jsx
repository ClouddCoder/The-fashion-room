import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function OfferItem({ alt, image, title, description }) {
  return (
    <Card sx={{ maxWidth: 345, m: 3 }}>
      <CardActionArea component={Link} to="/catalogue">
        <CardMedia component="img" alt={alt} height="140" src={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OfferItem;
