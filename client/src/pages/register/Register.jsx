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
    setUser,
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
      const res = await fetch("http://localhost:3050/api/register", {
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
      window.localStorage.setItem("logged", JSON.stringify(data));

      if (res.status === 200) {
        // Establece el estado de autenticacion y borra los campos de registro
        setAuth(data.userAuth);
        setUserId(data.userId);
        setUser(data.userName);
        setUserName("");
        setUserLastname("");
        setUserEmail("");
        setUserPassword("");
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
    switch (e.target.name) {
      case "userName":
        setError({ ...error, error: false, errorMessage: "" });
        setUserName(e.target.value);
        break;
      case "userLastname":
        setError({ ...error, error: false, errorMessage: "" });
        setUserLastname(e.target.value);
        break;
      case "userEmail":
        setError({ ...error, error: false, errorMessage: "" });
        setUserEmail(e.target.value);
        break;
      case "userPassword":
        setError({ ...error, error: false, errorMessage: "" });
        if (e.target.value.length <= 4) {
          setErrorPassword({
            ...errorPassword,
            errorPassword: true,
            errorMessage: "Debe tener más de 4 caracteres",
          });
        } else {
          setErrorPassword({ ...errorPassword, errorPassword: false, errorMessage: "" });
        }
        setUserPassword(e.target.value);
        break;
      default:
        return;
    }
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
