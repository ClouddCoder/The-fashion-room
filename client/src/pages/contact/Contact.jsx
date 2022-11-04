import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import StoreInfo from "./components/StoreInfo";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra la informacion de la tienda
 */
function Contact() {
  const [stores, getStores] = useState([]);
  const [storesPhones, getStoresPhones] = useState([]);

  /**
   * Gets the store's information.
   */
  const loadStores = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/stores");
      const { data } = response;
      getStores(data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Gets the store's phones.
   */
  const loadStoresPhones = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/stores/phones");
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
      getStoresPhones(phones);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Gets the store's phones in a list.
   */
  const getPhone = (storeNit) => storesPhones.filter((store) => store[0].store_nit === storeNit);

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    loadStoresPhones();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ height: "auto" }}>
        <Grid item container justifyContent="center" spacing={2}>
          {stores.map((store, index) => (
            <StoreInfo
              key={index}
              storeNit={store.store_nit}
              storeName={store.store_name}
              storeAddress={store.store_address}
              storePhone={getPhone(store.store_nit)}
            />
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Contact;
