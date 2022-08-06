import React, { useEffect, useState } from "react";
import StoreInfo from "../components/StoreInfo";
import { Grid, Container, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import axios from "axios";

function About() {
  const [stores, getStores] = useState();
  const [storesPhones, getStoresPhones] = useState();

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
        <Button component={Link} to="/" variant="contained">
          Regresar
        </Button>
      </Box>
    </Container>
  );
}

export default About;
