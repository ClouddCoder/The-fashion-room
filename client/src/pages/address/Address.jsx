import React from "react";
import Grid from "@mui/material/Grid";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";

function Address() {
  return (
    <Layout>
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3">Direcciones</CustomTypography>
        </Grid>
        <Grid item>
          <CustomTypography variant="body2">Selecciona o agrega una dirección</CustomTypography>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Address;
