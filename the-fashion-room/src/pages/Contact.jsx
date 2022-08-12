import React, { useEffect, useState } from "react";
import StoreInfo from "../components/StoreInfo";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";

function Contact() {
  const [stores, getStores] = useState();
  const [storesPhones, getStoresPhones] = useState();

  const loadStores = async () => {
    const response = await axios.get("http://api-server:3001/stores");
    const data = await response.data;
    getStores(data);
  };

  const loadStoresPhones = async () => {
    const response = await axios.get("http://api-server:3001/stores/phones");
    const data = await response.data;
    getStoresPhones(data);
  };

  useEffect(() => {
    loadStores();
    loadStoresPhones();
  }, []);

  return (
    <div>
      <Navbar />
      <Container component="div" sx={{ height: "auto", mt: 5, mb: 5 }}>
        <Box>
          <Grid container justifyContent="center" spacing={2}>
            {storesPhones &&
              stores?.map((store, index) => {
                return (
                  <StoreInfo
                    key={index}
                    store_name={store.name}
                    store_address={store.address}
                    store_phone={storesPhones[index].phone}
                  />
                );
              })}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;
