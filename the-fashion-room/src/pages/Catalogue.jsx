import { Button, Grid, Typography, Container, Paper, styled, ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3001/catalogue");
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "140px",
    maxHeight: "140px",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        {products.map(product => (
          <Box m={1} key={product.product_id}>
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
                <Grid item>
                  <ButtonBase
                    sx={{ width: 128, height: 128 }}
                    component={Link}
                    to={`/product/${product.product_id}`}
                  >
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
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Remove
                      </Typography>
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
        ))}
      </Grid>
      <Button component={Link} variant="contained" to="/" color="primary">
        Regresar
      </Button>
    </Container>
  );
};

export default Catalogue;
