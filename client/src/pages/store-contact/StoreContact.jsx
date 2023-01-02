import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { getStoreInformation } from "../../services/store";
import StoreInfo from "./components/StoreInfo";
import Layout from "../../components/layout/Layout";

/**
 * Componente que muestra la informacion de la tienda
 */
function Contact() {
  const [stores, setStores] = useState([]);

  /**
   * Gets the store's information.
   */
  const loadStores = async () => {
    try {
      const response = await getStoreInformation();
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ height: "auto" }} spacing={2}>
        {stores.map((store, index) => (
          <StoreInfo key={index} storeNit={store.store_nit} storeName={store.store_name} />
        ))}
      </Grid>
    </Layout>
  );
}

export default Contact;
