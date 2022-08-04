import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Invoice() {
  const { totalProducts, totalPrice } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "info.main",
        margin: "auto",
        height: "200px",
        width: "500px",
        mt: 20,
      }}
      elevation={1}
    >
      <Grid container direction="column">
        <Grid item container justifyContent="center" mt={2} mb={2}>
          <Typography variant="h5" component="div">
            Detalles de la compra
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Productos
          </Typography>
          <Typography variant="h6" component="div">
            {totalProducts}
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Total
          </Typography>
          <Typography variant="h6" component="div">
            {totalPrice}
          </Typography>
        </Grid>
        <Grid item align="center">
          <Button variant="contained" color="secondary" onClick={() => navigate("/catalogue")}>
            Seguir comprando
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Invoice;
