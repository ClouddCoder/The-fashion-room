import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button, Grid, Card, Typography, CardContent, TextField,
} from "@mui/material";

function Registrar() {
  const [username, setUsernameReg] = useState({ username: "" });
  const [password, setPasswordReg] = useState({ password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/insert", {
      method: "POST",
      body: JSON.stringify(username, password),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.status === 200) {
      navigate("/");
    }
    console.log(data);
  };

  const handleChange = (e) => {
    setUsernameReg({ ...username, [e.target.name]: e.target.value });
    setPasswordReg({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={3} alignItems="center" direction="column">
      <Grid item xs={12}>
        <Card sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2">
            Registrarse
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                name="username"
                variant="filled"
                label="username"
                sx={{ display: "block", margin: ".5rem 0" }}
              />
              <TextField
                onChange={handleChange}
                name="password"
                variant="filled"
                label="password"
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
