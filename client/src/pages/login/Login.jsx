import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Form from "../../components/form/Form";
import AuthContext from "../../context/auth-context/AuthContext";
import useError from "../../utils/hooks/useError";
import useLoader from "../../utils/hooks/useLoader";
import { loginUser } from "../../services/user";

/**
 * Component that renders the login page.
 * @returns {JSX.Element} Login component.
 */
function Login() {
  const { error, setInputError } = useError();
  const { loader, setLoaderComponent } = useLoader();
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
   * Sends the user's data to the server.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoaderComponent(true);
    try {
      const res = await loginUser(userEmail, userPassword);
      const data = await res.json();

      // Sets the user's data to login and deletes the data from the inputs.
      if (res.ok) {
        setAuth(data.isAuth);
        setUserId(data.userId);
        setUser(data.userName);
        setUsername(data.username);
        setToken(data.token);
        setUserEmail("");
        setUserPassword("");
        navigate("/");

        // Saves the token to the local storage.
        window.localStorage.setItem("logged", JSON.stringify(data));
      } else {
        setInputError({ ...error, constraint: "incorrecto", message: data.message });
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
    setLoaderComponent(false);
  };

  /**
   * Gets the email and password from the inputs.
   */
  const handleChange = (e) => {
    setInputError({ ...error, constraint: "", message: "" });

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
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <TextField
              error={error.constraint === "incorrecto"}
              helperText={error.message}
              onChange={handleChange}
              name="userEmail"
              variant="outlined"
              label="Email"
              value={userEmail}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              error={error.constraint === "incorrecto"}
              helperText={error.message}
              onChange={handleChange}
              name="userPassword"
              variant="outlined"
              label="Password"
              type="password"
              value={userPassword}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid container item justifyContent="space-between" xs={12}>
            <Grid item>
              <Link to="/edit-password">
                <span>¿Olvidaste tu contraseña?</span>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                <span>¿No tienes una cuenta? Registrate</span>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Form>
  );
}

export default Login;
