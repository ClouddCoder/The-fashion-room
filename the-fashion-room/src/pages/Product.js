import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";

const Product = () => {
  const productId = useParams();
  const [product, setProduct] = useState({ product_name: "", quantity: 0 });
  const [open, setOpen] = useState(true);

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
    <div>
      {product.product_name}
      <div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Cantidad" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
      <div>
        <Button component={Link} variant="contained" to="/catalogue" color="primary">
          Regresar
        </Button>
      </div>
    </div>
  );
};

export default Product;
