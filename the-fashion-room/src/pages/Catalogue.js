import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Paper,
  styled,
  ButtonBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagen from "../images/camisa.png";

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3001/catalogue");
    const data = await response.json();
    setProducts(data);
  };

  const navigate = useNavigate();

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
    /*
    <>
      <h3>Catalogue</h3>
      <Container>
        <Grid container spacing={3} alignItems="center">
          {products.map(product => (
            <Grid item xs={4} key={product.product_id}>
              <Card>
                <CardContent>
                  <Typography>{product.product_name}</Typography>
                  <Typography>Stock: {product.quantity}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/product/${product.product_id}`)}
                  >
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Button component={Link} variant="contained" to="/" color="primary">
        Regresar
      </Button>
    </>
    */
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: theme => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={imagen} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Camisa
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
  );
};

export default Catalogue;
