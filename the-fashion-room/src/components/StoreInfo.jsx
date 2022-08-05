import React from "react";
import { Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

function StoreInfo({ store_name, store_address, store_phone }) {
  return (
    <Grid item container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom component="div">
          {store_name}
        </Typography>
        <Divider />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h6" gutterBottom component="div">
            {store_address}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom component="div">
            {store_phone}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom component="div">
            Email
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
