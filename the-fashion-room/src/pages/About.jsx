import React, { useEffect, useState } from "react";
import StoreInfo from "../components/StoreInfo";
import { Grid, Typography, Paper, Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

function About() {
  const [stores, getStores] = useState([]);
  const [storesPhones, getStoresPhones] = useState([]);

  const loadStores = async () => {
    const response = await axios.get("http://localhost:3001/stores");
    const data = await response.data;
    getStores(data);
  };

  const loadStoresPhones = async () => {
    const response = await axios.get("http://localhost:3001/stores/phones");
    const data = await response.data;
    getStoresPhones(data);
  };

  useEffect(() => {
    loadStores();
    loadStoresPhones();
  }, []);

  return (
    <Container>
      <Box>
        <Grid container justifyContent="center" spacing={2}>
          {stores.map(store => (
            <StoreInfo
              key={store.nit}
              store_name={store.name}
              store_address={store.address}
              store_phone={storesPhones.phone}
            ></StoreInfo>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default About;
