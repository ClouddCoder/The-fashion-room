import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CustomTypography from "../../../commons/custom-typography/CustomTypography";

/**
 * Componente que muestra la informacion de la tienda
 */
function StoreInfo({ storeNit, storeName, storeAddress, storePhone }) {
  let phones = [];
  /**
   * Obtiene los telefonos de la tienda y los retorna en una lista.
   */
  const getPhone = () => {
    phones = storePhone?.filter((store) => store[0]?.store_nit === storeNit);
    return phones;
  };

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
        <Grid item>
          <CustomTypography variant="body2" gutterBottom>
            Teléfono 1: {getPhone()[0][0]?.phone}
          </CustomTypography>
        </Grid>
        <Grid item>
          <CustomTypography variant="body2" gutterBottom>
            Teléfono 2: {getPhone()[0][1]?.phone}
          </CustomTypography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
