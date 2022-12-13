import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Form from "../../commons/form/Form";
import AuthContext from "../../context/auth-context/AuthContext";

/**
 * This component renders the login form
 */
function Login() {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const {
    setAuth,
    setUserId,
    setUser,
    setUsername,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    setToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  /**
   * Send the user's data to the server
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
      // Set the user's data to login and deletes the data from the inputs
      setAuth(data.userAuth);
      setUserId(data.userId);
      setUser(data.userName);
      setUsername(data.username);
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
   * Gets email and password from the inputs
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
    }
  };

  return (
    <Form title="Iniciar sesión">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              error={error.error}
              helperText={error.errorMessage}
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
              error={error.error}
              helperText={error.errorMessage}
              onChange={handleChange}
              name="userPassword"
              variant="outlined"
              label="Password"
              type="password"
              value={userPassword}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid container item justifyContent="space-between" xs={12}>
            <Grid item>
              <Link to="/">
                <span>Forgot password?</span>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <span>Don't have an account? Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Form>
  );
}

export default Login;
