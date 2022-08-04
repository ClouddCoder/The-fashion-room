import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Card, Typography, CardContent, TextField } from "@mui/material";

function Registrar() {
  const [name, setName] = useState({ name: "" });
  const [lastname, setLastname] = useState({ lastname: "" });
  const [email, setEmail] = useState({ email: "" });
  const [password, setPasswordReg] = useState({ password: "" });

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(name, lastname, email, password),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();

    if (res.status === 200) {
      navigate("/");
    }
    console.log(data);
  };

  const handleChange = e => {
    setName({ ...name, [e.target.name]: e.target.value });
    setLastname({ ...lastname, [e.target.name]: e.target.value });
    setEmail({ ...email, [e.target.name]: e.target.value });
    setPasswordReg({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={3} alignItems="center" direction="column">
      <Grid item={true} xs={12}>
        <Card sx={{ mt: 5 }} align="center">
          <Typography variant="h5" component="h2">
            Registrarse
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                name="name"
                variant="filled"
                label="Name"
                sx={{ display: "block", margin: ".5rem 0" }}
              />
              <TextField
                onChange={handleChange}
                name="lastname"
                variant="filled"
                label="Lastname"
                sx={{ display: "block", margin: ".5rem 0" }}
              />
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
                sx={{ display: "block", margin: ".5rem 0" }}
              />
              <Button variant="contained" color="secondary" type="submit">
                Registrar
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

export default Registrar;
