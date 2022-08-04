import React from "react";
import { Grid, Typography, Paper, styled, Button } from "@mui/material";
import { Box } from "@mui/system";

function ProductItem({ product, addToCart }) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "140px",
    maxHeight: "140px",
  });

  return (
    <Box m={1}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: theme => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
        }}
        elevation={1}
      >
        <Grid container spacing={2}>
          <Grid item={true} sx={{ width: 160, height: 160 }}>
            <Img alt="complex" src={require(`../images/${product.product_name}.png`)} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item={true} xs container direction="column" spacing={2}>
              <Grid item={true} xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad disponible {product.stock}
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => addToCart(product.product_id)} variant="outlined">
                  Agregar al carrito
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductItem;
