import React from "react";
import OfferItem from "../OfferItem";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import calzado from "../../assets/offers/Calzado.png";
import camisetas from "../../assets/offers/Camisetas.png";
import deportiva from "../../assets/offers/Deportiva.png";
import bolsos from "../../assets/offers/Bolsos.png";
import "./Offers.css";

function Offers() {
  return (
    <Box className="offer_container" mb={3}>
      <Grid container align="center">
        <Grid item xs={3}>
          <OfferItem
            alt={"calzado"}
            image={calzado}
            title={"Calzado"}
            description={"Calzado de todo tipo"}
          />
        </Grid>
        <Grid item xs={3}>
          <OfferItem
            alt={"camisetas"}
            image={camisetas}
            title={"Camisetas"}
            description={"Camisetas de todo tipo"}
          />
        </Grid>
        <Grid item xs={3}>
          <OfferItem
            alt={"deportiva"}
            image={deportiva}
            title={"Ropa deportiva"}
            description={"Ropa deportiva de todo tipo"}
          />
        </Grid>
        <Grid item xs={3}>
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
