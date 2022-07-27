import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Grid, Container } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Box } from "@mui/system";

const Product = () => {
  const productId = useParams();
  const [product, setProduct] = useState({ product_name: "", quantity: 0 });
  const [open, setOpen] = useState(false);
  const cantidades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleClick = () => {
    setOpen(!open);
  };

  const loadProduct = async id => {
    const res = await fetch(`http://localhost:3001/product/${id}`);
    const data = await res.json();
    setProduct({ product_name: data.product_name, quantity: data.quantity });
  };

  useEffect(() => {
    if (productId.id) {
      loadProduct(productId.id);
    }
  }, [productId]);

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item>{product.product_name}</Grid>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Grid item>
          <List
            sx={{ width: "100%", bgcolor: "background.paper", borderRadius: "15px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick} sx={{ width: 150, height: 10 }}>
              <ListItemText primary="Cantidad" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div">
                {cantidades.map(cantidad => (
                  <ListItemButton sx={{ pl: 4, pb: 0, pt: 0 }}>
                    <ListItemText primary={cantidad} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item>
          <Button component={Link} variant="contained" to="/catalogue" color="primary">
            Regresar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
