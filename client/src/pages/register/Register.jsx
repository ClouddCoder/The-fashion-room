import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Form from "../../commons/form/Form";
import AuthContext from "../../context/auth-context/AuthContext";

/**
 * Componente que muestra el register
 */
function Register() {
  const {
    setAuth,
    setUserId,
    setUser,
    userName,
    setUserName,
    setUsername,
    userLastname,
    setUserLastname,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    setToken,
  } = useContext(AuthContext);

  // Check if the user's name, lastname or email is empty
  const [error, setError] = useState({ error: false, constraint: "", errorMessage: "" });

  // Check if the user's password is less than 4 characters
  const [errorPassword, setErrorPassword] = useState({ errorPassword: false, errorMessage: "" });
  const navigate = useNavigate();

  /**
   * Peticion a la API para validar el usuario y crearlo
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the user submits the form with a password error, it will not be sent
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
        setUsername(data.username);
        setUserName("");
        setUserLastname("");
        setUserEmail("");
        setUserPassword("");
        setToken(data.token);
        navigate("/");
      } else {
        console.log(data);
        setError({
          ...error,
          error: true,
          constraint: data.constraint,
          errorMessage: data.errorMessage,
        });
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
   * Guarda la informacion del nombre, apellido,
   * email y contraseña cuando el usuario escribe en los inputs.
   * Tambien borra el mensaje de error cuando el usuario empieza a escribir nuevamente.
   */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "userName":
        setError({ ...error, error: false, constraint: "", errorMessage: "" });
        setUserName(e.target.value);
        break;
      case "userLastname":
        setError({ ...error, error: false, constraint: "", errorMessage: "" });
        setUserLastname(e.target.value);
        break;
      case "userEmail":
        setError({ ...error, error: false, constraint: "", errorMessage: "" });
        setUserEmail(e.target.value);
        break;
      case "userPassword":
        setError({ ...error, error: false, constraint: "", errorMessage: "" });
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
    }
  };

  /**
   * Muestra el error en caso de que sea por ingresar datos incorrectos
   * o por no cumplir con los requisitos de la contraseña.
   */
  const handleError = () => {
    if (error.error) {
      return error.errorMessage;
    }

    if (errorPassword.errorPassword) {
      return errorPassword.errorMessage;
    }

    return "";
  };

  return (
    <Form title="Registrarse">
      <form onSubmit={handleSubmit}>
        <TextField
          error={error.constraint === "name"}
          helperText={error.constraint === "name" ? error.errorMessage : ""}
          onChange={handleChange}
          name="userName"
          variant="filled"
          label="Name"
          value={userName}
          sx={{ margin: ".5rem 0" }}
        />
        <TextField
          error={error.constraint === "lastname"}
          helperText={error.constraint === "lastname" ? error.errorMessage : ""}
          onChange={handleChange}
          name="userLastname"
          variant="filled"
          label="Lastname"
          value={userLastname}
          sx={{ margin: ".5rem 0" }}
        />
        <TextField
          error={error.constraint === "email"}
          helperText={error.constraint === "email" ? error.errorMessage : ""}
          onChange={handleChange}
          name="userEmail"
          variant="filled"
          label="Email"
          value={userEmail}
          sx={{ margin: ".5rem 0" }}
        />
        <TextField
          error={error.constraint === "password" || errorPassword.errorPassword}
          helperText={handleError()}
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

export default Register;
