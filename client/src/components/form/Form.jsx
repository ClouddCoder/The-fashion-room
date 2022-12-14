import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomTypography from "../custom-typography/CustomTypography";
import Layout from "../layout/Layout";

function Form({ children, title }) {
  return (
    <Layout>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <CustomTypography variant="h5" align="center">
            {title}
          </CustomTypography>
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Form;
