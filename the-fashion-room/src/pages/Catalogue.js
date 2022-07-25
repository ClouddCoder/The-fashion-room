import { Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Catalogue = () => {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await fetch('http://localhost:3001/catalogue');
        const data = await response.json();
        setProducts(data);
    }

    const [quantity, setQuantity] = useState({"quantity": ""});
    const [product_id, setProductId] = useState({"product_id": ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/catalogue", {
            method: "PUT",
            body: JSON.stringify(product_id, quantity),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        console.log(data);
        console.log(quantity);
    };

    const handleChange = (e) => {
        setQuantity({...quantity, [e.target.name]: e.target.value});
        setProductId({...product_id, [e.target.name]: e.target.value});
    };

    const handleId = (id) => {
        setProductId({product_id: id});
        console.log(product_id);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <h3>Catalogue</h3>
            <Grid container spacing={3} alignItems="center">
                {
                    products.map(product => (
                        <Grid item xs={4} key={product.product_id}>
                            <Card>
                                <CardContent>
                                    <Typography>{product.product_name}</Typography>
                                    <Typography>{product.quantity}</Typography>
                                    <form onSubmit={handleSubmit}>
                                        <TextField onChange={handleChange} name="quantity" variant="filled" label="Cantidad a comprar"/>
                                    </form>
                                    <Button variant="contained" color="secondary" type="submit" onClick={() => handleId(product.product_id)}>Comprar</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <Button component={Link} variant="contained" to="/" color="primary">Regresar</Button>
        </>
    )
}

export default Catalogue;