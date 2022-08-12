import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import CardActions from "@mui/material/CardActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import OrderDetail from "../components/OrderDetail";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

/**
 * Componente que muestra la informacion de la orden
 */
function InvoiceDetail({ groupItems }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  return (
    <Grid container item direction="column" mt={4}>
      <Grid item>
        <Card sx={{ width: 500 }}>
          <CardHeader
            title="Factura"
            subheader={"#" + groupItems[0].invoice_id}
            sx={{ backgroundColor: "#17CCF9", height: 40 }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: 25,
            }}
            align="center"
          >
            <Typography variant="h6" component="div" sx={{ width: 150 }}>
              Articulo
            </Typography>

            <Typography variant="h6" component="div" sx={{ width: 150 }}>
              Cantidad
            </Typography>

            <Typography variant="h6" component="div" sx={{ width: 150 }}>
              Costo
            </Typography>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </CardContent>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {groupItems.map((item, index) => {
              return <OrderDetail orderDetail={item} key={index} />;
            })}
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}

export default InvoiceDetail;
