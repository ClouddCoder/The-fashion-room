import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Registrar() {
  const [name, setName] = useState({ name: "" });
  const [lastname, setLastname] = useState({ lastname: "" });
  const [email, setEmail] = useState({ email: "" });
  const [password, setPasswordReg] = useState({ password: "" });
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://api-server:3001/register", {
      method: "POST",
      body: JSON.stringify(name, lastname, email, password),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
    const data = await res.json();

    if (res.status === 200) {
      navigate("/");
    } else {
      setError({ error: true, errorMessage: data.message });
    }
  };

  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
    setLastname({ ...lastname, [e.target.name]: e.target.value });
    setEmail({ ...email, [e.target.name]: e.target.value });
    setPasswordReg({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <Grid container direction="column" align="center">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item={true} container direction="column" pt={15} pb={10}>
        <Grid item>
          <Card sx={{ maxWidth: 300 }}>
            <Typography variant="h5" component="h2">
              Registrate
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  onChange={handleChange}
                  name="name"
                  variant="filled"
                  label="Name"
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  onChange={handleChange}
                  name="lastname"
                  variant="filled"
                  label="Lastname"
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  error={error.error}
                  helperText={error.errorMessage}
                  onChange={handleChange}
                  name="email"
                  variant="filled"
                  label="Email"
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  error={error.error}
                  helperText={error.errorMessage}
                  onChange={handleChange}
                  name="password"
                  variant="filled"
                  label="Password"
                  type="password"
                  sx={{ margin: ".5rem 0" }}
                />
                <CardContent>
                  <Button variant="contained" color="secondary" type="submit">
                    Registrar
                  </Button>
                </CardContent>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Button component={Link} variant="contained" to="/" color="primary">
            Regresar
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Registrar;
