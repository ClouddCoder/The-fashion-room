import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

/**
 * Componente que muestra el login
 */
function Ingresar() {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const {
    setAuth,
    setUserId,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    setToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  /**
   * Peticion a la API para validar el usuario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3050/api-server/login", {
      method: "POST",
      body: JSON.stringify({ userEmail, userPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.status === 200) {
      setAuth(data.auth);
      setToken(data.token);
      setUserId(data.id);
      setUserName(data.name);
      navigate("/catalogue");

      // Save token to localStorage
      window.localStorage.setItem("logged", JSON.stringify(data));
    } else {
      setError({ error: true, errorMessage: data.message });
    }
  };

  /**
   * Guarda la informacion del email y contraseña cuando el usuario escribe en los inputs
   */
  const handleChange = (e) => {
    setUserEmail(e);
    setUserPassword(e);
    setError({ error: false, errorMessage: "" });
  };

  console.log(userEmail);
  console.log(userPassword);

  return (
    <Grid container direction="column" align="center">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item={true} container direction="column" pt={15} pb={25}>
        <Grid item>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Inicia sesion
              </Typography>
            </CardContent>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  error={error.error}
                  helperText={error.errorMessage}
                  onChange={handleChange}
                  name="userEmail"
                  variant="filled"
                  label="Email"
                  sx={{ margin: ".5rem 0" }}
                />
                <TextField
                  error={error.error}
                  helperText={error.errorMessage}
                  onChange={handleChange}
                  name="userPassword"
                  variant="filled"
                  label="Password"
                  type="password"
                  sx={{ margin: ".5rem 0" }}
                />
                <CardContent>
                  <Button variant="contained" color="secondary" type="submit">
                    Login
                  </Button>
                </CardContent>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
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

export default Ingresar;
