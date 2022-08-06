import React from "react";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offers from "../components/offers/Offers";
import { Grid, Container, Button } from "@mui/material";
import { Box, width } from "@mui/system";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Offers />
      <Footer />
    </div>
  );
}

export default Home;
