import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { getStoreInformation, getStorePhones } from "../../services/store";
import StoreInfo from "./components/StoreInfo";
import Layout from "../../components/layout/Layout";

/**
 * Componente que muestra la informacion de la tienda
 */
function Contact() {
  const [stores, getStores] = useState([]);
  const [storesPhones, setStorePhones] = useState([]);

  /**
   * Gets the store's information.
   */
  const loadStores = async () => {
    try {
      const response = await getStoreInformation();
      getStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Gets the store's phones.
   */
  const loadStoresPhones = async () => {
    try {
      const response = await getStorePhones();
      const { data } = response;

      // Groups the phone by their store's name.
      const phones = Object.values(
        data?.reduce(
          (acc, item) => ({
            ...acc,
            [item.store_nit]: (acc[item.store_nit] || []).concat(item),
          }),
          {},
        ),
      );
      setStorePhones(phones);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Gets the phones for a specific store given its nit.
   */
  const getPhone = (storeNit) => storesPhones.filter((store) => store[0].store_nit === storeNit);

  useEffect(() => {
    loadStores();
    loadStoresPhones();
  }, []);

  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ height: "auto" }} spacing={2}>
        {stores.map((store, index) => (
          <StoreInfo
            key={index}
            storeNit={store.store_nit}
            storeName={store.store_name}
            storePhone={getPhone(store.store_nit)}
          />
        ))}
      </Grid>
    </Layout>
  );
}

export default Contact;
