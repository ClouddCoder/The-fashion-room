import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";

/**
 * Componente que muestra la informacion de la tienda
 */
function StoreInfo({ storeName, storeAddress, storePhone }) {
  // Retorna undefined si el array no tiene elementos.
  const phones = storePhone[0] || [];

  return (
    <Grid item container>
      <Grid item={true} xs={12}>
        <CustomTypography variant="h4" gutterBottom>
          {storeName}
        </CustomTypography>
        <Divider />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <CustomTypography variant="body2" gutterBottom>
            Dirección: {storeAddress}
          </CustomTypography>
        </Grid>
        {phones.map((phone, index) => (
          <Grid item key={index}>
            <CustomTypography variant="body2" gutterBottom>
              {`Teléfono ${index + 1}`}: {phone.phone}
            </CustomTypography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
