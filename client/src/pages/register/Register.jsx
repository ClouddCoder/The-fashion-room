import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Form from "../../commons/form/Form";
import AuthContext from "../../context/auth-context/AuthContext";

/**
 * This component is responsible for registering a new user.
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

  // Checks if the user's name, lastname or email is empty
  const [error, setError] = useState({ constraint: "", errorMessage: "" });

  // Checks if the user's password is less than 4 characters
  const [errorPassword, setErrorPassword] = useState({ errorPassword: false, errorMessage: "" });
  const navigate = useNavigate();

  /**
   * Send the user's data to the server
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
        // Set the user's data to login and deletes the data from the inputs
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
   * Gets the user's data from the inputs. It also deletes the error message
   * when the user starts typing again.
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

  return (
    <Form title="Registrarse">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              error={error.constraint === "name"}
              helperText={error.constraint === "name" ? error.errorMessage : ""}
              onChange={handleChange}
              name="userName"
              variant="outlined"
              label="Name"
              value={userName}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={error.constraint === "lastname"}
              helperText={error.constraint === "lastname" ? error.errorMessage : ""}
              onChange={handleChange}
              name="userLastname"
              variant="outlined"
              label="Lastname"
              value={userLastname}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.constraint === "email"}
              helperText={error.constraint === "email" ? error.errorMessage : ""}
              onChange={handleChange}
              name="userEmail"
              variant="outlined"
              label="Email"
              value={userEmail}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.constraint === "password" || errorPassword.errorPassword}
              helperText={
                error.constraint === "password" ? error.errorMessage : errorPassword.errorMessage
              }
              onChange={handleChange}
              name="userPassword"
              variant="outlined"
              label="Password"
              type="password"
              value={userPassword}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
        </Grid>
        <CardContent>
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Registrar
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}

export default Register;
