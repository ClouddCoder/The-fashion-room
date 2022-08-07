import React, { useState, useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Card, Typography, CardContent, TextField } from "@mui/material";

function Ingresar() {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPasswordLog] = useState({ password: "" });
  const { setAuth, setUserName } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(email, password),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.status === 200) {
      setAuth(true);
      setUserName(data.name);
      navigate("/catalogue");
    }
    console.log(data);
  };

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
    setPasswordLog({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={3} alignItems="center" direction="column">
      <Grid item={true} xs={12}>
        <Card sx={{ mt: 5 }} align="center">
          <Typography variant="h5" component="h2">
            Inicar sesion
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                name="email"
                variant="filled"
                label="Email"
                sx={{ display: "block", margin: ".5rem 0" }}
              />
              <TextField
                onChange={handleChange}
                name="password"
                variant="filled"
                label="Password"
                type="password"
                sx={{ display: "block", margin: ".5rem 0" }}
              />
              <Button variant="contained" color="secondary" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <Button component={Link} variant="contained" to="/" color="primary">
          Regresar
        </Button>
      </Grid>
    </Grid>
  );
}

export default Ingresar;
