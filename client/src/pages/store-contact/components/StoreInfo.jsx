import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CustomTypography from "../../../components/custom-typography/CustomTypography";
import { getStoreAddress, getStorePhones } from "../../../services/store";

/**
 * Componente que muestra la informacion de la tienda
 */
function StoreInfo({ storeNit, storeName }) {
  const [storeAddress, setStoreAddress] = useState([]);
  const [storePhones, setStorePhones] = useState([]);

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

  /**
   * Gets the store's phones.
   */
  const loadStoresPhones = async () => {
    try {
      const response = await getStorePhones(storeNit);
      setStorePhones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStoreAddress();
    loadStoresPhones();
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
            {storeAddress.map(
              (address) =>
                `Dirección: ${address.street_name} ${address.street} ${address.street_number}`,
            )}
          </CustomTypography>
        </Grid>
        {storePhones.map((phone, index) => (
          <Grid item key={index}>
            <CustomTypography variant="body2" gutterBottom>
              {`Teléfono ${index + 1}`}: {phone.phone_number}
            </CustomTypography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
