import React from "react";
import OfferItem from "../sub-components/OfferItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import calzado from "../../../../assets/offers/Calzado.png";
import camisetas from "../../../../assets/offers/Camisetas.png";
import deportiva from "../../../../assets/offers/Deportiva.png";
import bolsos from "../../../../assets/offers/Bolsos.png";
import "./Offers.css";

/**
 * Componente que muestra las diferentes categorias de la tienda en el inicio
 */
function Offers() {
  return (
    <Box className="offersContainer">
      <Grid container align="center" spacing={2}>
        <Grid item={true} xs={6} md={3}>
          <OfferItem
            alt={"calzado"}
            image={calzado}
            title={"Calzado"}
            description={"Calzado de todo tipo"}
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <OfferItem
            alt={"camisetas"}
            image={camisetas}
            title={"Camisetas"}
            description={"Camisetas de todo tipo"}
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <OfferItem
            alt={"deportiva"}
            image={deportiva}
            title={"Ropa deportiva"}
            description={"Ropa deportiva de todo tipo"}
          />
        </Grid>
        <Grid item={true} xs={6} md={3}>
          <OfferItem
            alt={"bolsos"}
            image={bolsos}
            title={"Bolsos y maletas"}
            description={"Bolsos y maletas de todo tipo"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Offers;
