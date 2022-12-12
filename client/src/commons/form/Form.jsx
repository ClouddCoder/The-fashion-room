import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomTypography from "../custom-typography/CustomTypography";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Form({ children, title }) {
  return (
    <div className="container">
      <Navbar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ width: "80%", m: "auto 0" }}
      >
        <Grid item>
          <Card sx={{ maxWidth: 600 }}>
            <CardContent>
              <CustomTypography variant="h5">{title}</CustomTypography>
            </CardContent>
            <CardContent>{children}</CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Button component={Link} variant="contained" to="/" color="primary">
            Regresar
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Form;
