import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra el register
 */
function Registrar() {
  const [name, setName] = useState({ name: "" });
  const [lastname, setLastname] = useState({ lastname: "" });
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [errorPassword, setErrorPassword] = useState({ errorPassword: false, errorMessage: "" });
  const navigate = useNavigate();

  /**
   * Peticion a la API para validar el usuario y crearlo
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorPassword.errorPassword) {
      setErrorPassword({ errorPassword: false, errorMessage: "" });
      const res = await fetch("http://localhost:3050/api-server/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.name,
          lastname: lastname.lastname,
          email: email.email,
          password: password.password,
        }),
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
      const data = await res.json();

      console.log(res.status);
      if (res.status === 200) {
        navigate("/");
      } else {
        setError({ ...error, error: true, errorMessage: data.message });
      }
    } else {
      setErrorPassword({
        ...errorPassword,
        errorPassword: true,
        errorMessage: "Debe tener más de 4 caracteres",
      });
    }
  };

  /**
   * Guarda la informacion del nombre, apellido, email y contraseña cuando el usuario escribe en los inputs
   */
  const handleChange = (e) => {
    if (e.target.name === "password") {
      if (e.target.value.length <= 4) {
        setErrorPassword({
          ...errorPassword,
          errorPassword: true,
          errorMessage: "Debe tener más de 4 caracteres",
        });
      } else {
        setErrorPassword({ ...errorPassword, errorPassword: false, errorMessage: "" });
      }
    }

    setName({ ...name, [e.target.name]: e.target.value });
    setLastname({ ...lastname, [e.target.name]: e.target.value });
    setEmail({ ...email, [e.target.name]: e.target.value });
    setPassword({ ...password, [e.target.name]: e.target.value });
    setError({ ...error, error: false, errorMessage: "" });
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
                  value={name.name}
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  onChange={handleChange}
                  name="lastname"
                  variant="filled"
                  label="Lastname"
                  value={lastname.lastname}
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  error={error.error}
                  helperText={error.errorMessage}
                  onChange={handleChange}
                  name="email"
                  variant="filled"
                  label="Email"
                  value={email.email}
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  error={error.error || errorPassword.errorPassword ? true : false}
                  helperText={
                    error.error
                      ? error.errorMessage
                      : errorPassword.errorPassword
                      ? errorPassword.errorMessage
                      : ""
                  }
                  onChange={handleChange}
                  name="password"
                  variant="filled"
                  label="Password"
                  type="password"
                  value={password.password}
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
