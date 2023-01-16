import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { getStoreAddress, getStorePhones } from "../../../services/store";

/**
 * Component to render the store's information.
 * @param {object} { storeNit, storeName } - Store's nit and name.
 * @returns {JSX.Element} - StoreInfo component.
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
        <h4>{storeName}</h4>
        <Divider />
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <span>
            {storeAddress.map(
              (address) =>
                `Dirección: ${address.street_name} ${address.street} ${address.street_number}`,
            )}
          </span>
        </Grid>
        {storePhones.map((phone, index) => (
          <Grid item key={index}>
            <span>
              {`Teléfono ${index + 1}`}: {phone.phone_number}
            </span>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default StoreInfo;
