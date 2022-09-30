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
  const [stores, getStores] = useState();
  const [storesPhones, getStoresPhones] = useState();

  /**
   * Peticion a la API para obtener la informacion de las tiendas
   */
  const loadStores = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/stores");
      const data = await response.data;
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
      const data = await response.data;
      getStoresPhones(data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Ejecuta la funcion loadStores() y loadStoresPhones()
   */
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
          {storesPhones &&
            stores?.map((store, index) => (
              <StoreInfo
                key={index}
                storeName={store.name}
                storeAddress={store.address}
                storePhone={storesPhones[index].phone}
              />
            ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Contact;
