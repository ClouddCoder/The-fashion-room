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
   * Peticion a la API para obtener la informacion de las tiendas
   */
  const loadStores = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/stores");
      const { data } = await response;
      getStores(data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Peticion a la API para obtener la informacion de los telefonos de las tiendas
   */
  const loadStoresPhones = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/stores/phones");
      const { data } = response;

      // Agrupa los telefonos por el nombre de la tienda.
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
   * Peticion a la API para obtener la informaion de las tiendas.
   */
  useEffect(() => {
    loadStores();
  }, []);

  // Peticion a la API para obtener la informacion de los telefonos de las tiendas.
  useEffect(() => {
    loadStoresPhones();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Grid container sx={{ height: "auto" }}>
        <Grid item container justifyContent="center" spacing={2}>
          {storesPhones &&
            stores?.map((store, index) => (
              <StoreInfo
                key={index}
                storeNit={store.store_nit}
                storeName={store.store_name}
                storeAddress={store.store_address}
                storePhone={storesPhones}
              />
            ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Contact;
