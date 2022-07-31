import React from "react";
import { Grid, Typography, Paper, ButtonBase, styled, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

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
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
        }}
        elevation={1}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }} component={Link} to="/shoppingcart">
              <Img alt="complex" src={require(`../images/${product.product_name}.png`)} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: 1030114
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
                $19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductItem;
