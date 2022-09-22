import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Form from "../../commons/form/Form";

/**
 * Componente que muestra el login
 */
function Login() {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const {
    setAuth,
    setUserId,
    setUser,
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
    const res = await fetch("http://localhost:3050/api/login", {
      method: "POST",
      body: JSON.stringify({ userEmail, userPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === 200) {
      // Establece el estado de autenticacion y borra los campos de login
      setAuth(data.userAuth);
      setUserId(data.userId);
      setUser(data.userName);
      setUserEmail("");
      setUserPassword("");
      setToken(data.token);
      navigate("/");

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
    switch (e.target.name) {
      case "userEmail":
        setUserEmail(e.target.value);
        break;
      case "userPassword":
        setUserPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <Form title="Iniciar sesión">
      <form onSubmit={handleSubmit}>
        <TextField
          error={error.error}
          helperText={error.errorMessage}
          onChange={handleChange}
          name="userEmail"
          variant="filled"
          label="Email"
          value={userEmail}
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
          value={userPassword}
          sx={{ margin: ".5rem 0" }}
        />
        <CardContent>
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}

export default Login;
