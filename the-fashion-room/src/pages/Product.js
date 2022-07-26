import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Product = () => {
  const productId = useParams();
  const [product, setProduct] = useState({ product_name: "", quantity: 0 });

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
      <Button component={Link} variant="contained" to="/catalogue" color="primary">
        Regresar
      </Button>
    </div>
  );
};

export default Product;
