import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

/**
 * Componente que muestra la informacion de la tienda
 */
function StoreInfo({ storeName, storeAddress, storePhone }) {
  return (
    <Grid item container>
      <Grid item={true} xs={12}>
        <Typography variant="h4" gutterBottom>
          {storeName}
        </Typography>
        <Divider />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Dirección: {storeAddress}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Teléfono: {storePhone}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
