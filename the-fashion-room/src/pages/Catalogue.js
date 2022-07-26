import { Button, Card, CardContent, Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch("http://localhost:3001/catalogue");
    const data = await response.json();
    setProducts(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  return (
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
  );
};

export default Catalogue;
