import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Form from "../../commons/form/Form";

/**
 * Componente que muestra el register
 */
function Registrar() {
  const {
    setAuth,
    setUserId,
    userName,
    setUserName,
    userLastname,
    setUserLastname,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    setToken,
  } = useContext(AuthContext);
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
          userName,
          userLastname,
          userEmail,
          userPassword,
        }),
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
      const data = await res.json();
      console.log(data);
      window.localStorage.setItem("logged", JSON.stringify(data));

      if (res.status === 200) {
        setAuth(data.userAuth);
        setUserId(data.userId);
        setToken(data.token);
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
    if (e.target.name === "userPassword") {
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

    setUserName(e);
    setUserLastname(e);
    setUserEmail(e);
    setUserPassword(e);
    setError({ ...error, error: false, errorMessage: "" });
  };

  return (
    <Form title="Registrarse">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          name="userName"
          variant="filled"
          label="Name"
          value={userName}
          sx={{ margin: ".5rem 0" }}
        />
        <TextField
          onChange={handleChange}
          name="userLastname"
          variant="filled"
          label="Lastname"
          value={userLastname}
          sx={{ margin: ".5rem 0" }}
        />
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
          error={error.error || errorPassword.errorPassword ? true : false}
          helperText={
            error.error
              ? error.errorMessage
              : errorPassword.errorPassword
              ? errorPassword.errorMessage
              : ""
          }
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
            Registrar
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}

export default Registrar;
