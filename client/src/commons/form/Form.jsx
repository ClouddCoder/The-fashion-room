import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomTypography from "../custom-typography/CustomTypography";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Form.css";

function Form({ children, title }) {
  return (
    <div className="container">
      <Navbar />
      <main id="form-card">
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <CustomTypography variant="h5" align="center">
              {title}
            </CustomTypography>
            {children}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Form;
