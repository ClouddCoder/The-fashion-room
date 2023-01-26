import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Form from "../../components/form/Form";
import AuthContext from "../../context/auth-context/AuthContext";
import useError from "../../utils/hooks/useError";
import usePasswordLength from "../../utils/hooks/usePasswordLength";
import useOpenComponent from "../../utils/hooks/useOpenComponent";
import { registerUser } from "../../services/user";

/**
 * Component to register a new user.
 * @returns {JSX.Element} - Register component.
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
  const { error, setInputError } = useError();

  const { open, setOpenComponent } = useOpenComponent();

  // Checks if the user's password is less than or equal to 4 characters
  const { password, checkPasswordLength } = usePasswordLength();
  const navigate = useNavigate();

  /**
   * Sends the user's data to the server
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpenComponent(true);

    // If the user submits the form with a password error, it will not be sent
    if (!password.shortPassword) {
      checkPasswordLength({ ...password, shortPassword: false, errorMessage: "" });

      try {
        const res = await registerUser(userName, userLastname, userEmail, userPassword);
        const data = await res.json();

        // Sets the user's data to login and resets the data from the inputs
        if (res.ok) {
          setAuth(data.isAuth);
          setUserId(data.userId);
          setUser(userName);
          setUsername(userName); // The username will be the same as the name at the beginning
          setToken(data.token);
          setUserName("");
          setUserLastname("");
          setUserEmail("");
          setUserPassword("");
          navigate("/");

          window.localStorage.setItem("logged", JSON.stringify(data));
        } else {
          setInputError({
            ...error,
            constraint: data.constraint,
            message: data.errorMessage,
          });

          throw new Error(data.message);
        }
      } catch (err) {
        console.log(err);
      }

      setOpenComponent(false);
    }
  };

  /**
   * Gets the user's data from the inputs. It also deletes the error message
   * when the user starts typing again.
   */
  const handleChange = (e) => {
    setInputError({ ...error, constraint: "", message: "" });
    switch (e.target.name) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "userLastname":
        setUserLastname(e.target.value);
        break;
      case "userEmail":
        setUserEmail(e.target.value);
        break;
      case "userPassword":
        if (e.target.value.length <= 4) {
          checkPasswordLength({
            ...password,
            shortPassword: true,
            errorMessage: "Debe tener más de 4 caracteres",
          });
        } else {
          checkPasswordLength({ ...password, shortPassword: false, errorMessage: "" });
        }
        setUserPassword(e.target.value);
        break;
      default:
    }
  };

  return (
    <Form title="Registrarse">
      {open && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              error={error.constraint === "name"}
              helperText={error.constraint === "name" && error.message}
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
              helperText={error.constraint === "lastname" && error.message}
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
              helperText={error.constraint === "email" && error.message}
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
              error={error.constraint === "password" || password.shortPassword}
              helperText={
                error.constraint === "password" ? error.message : password.errorMessage
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
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Form>
  );
}

export default Register;
