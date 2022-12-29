import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CustomTypography from "../../../components/custom-typography/CustomTypography";
import { getStoreAddress } from "../../../services/store";

/**
 * Componente que muestra la informacion de la tienda
 */
function StoreInfo({ storeNit, storeName, storePhone }) {
  const [storeAddress, setStoreAddress] = useState([]);
  // Retorna undefined si las listas no tienen elementos. Asi no se rompe el codigo.
  const phones = storePhone[0] || [];
  const address = storeAddress[0] || [];
  console.log(address);

  /**
   * Gets the store's address.
   */
  const loadStoreAddress = async () => {
    try {
      const response = await getStoreAddress(storeNit);
      setStoreAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStoreAddress();
  }, []);

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
            Dirección: {`${address.street_name} ${address.street} ${address.street_number}`}
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
