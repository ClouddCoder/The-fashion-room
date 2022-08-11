import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function StoreInfo({ store_name, store_address, store_phone }) {
  return (
    <Grid item container>
      <Grid item={true} xs={12}>
        <Typography variant="h4" gutterBottom component="div">
          {store_name}
        </Typography>
        <Divider />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h6" gutterBottom component="div">
            Dirección: {store_address}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom component="div">
            Teléfono: {store_phone}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
