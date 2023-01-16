import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as services from "../../services/user";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import useUserInput from "../../utils/hooks/useUserInput";
import "./EditData.css";

/**
 * Component to edit user's data. This edits the user's name, email or username.
 * @returns {JSX.Element} - EditData component.
 */
function EditEmail() {
  const { info } = useParams();
  const { input, setUserInput } = useUserInput();
  const inputLastname = useUserInput();
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);

  // Variables to change the information displayed in the form
  let title = "";
  let successMessage = "";
  let inputLabel = "";
  let secondInputLabel = "";
  let inputAriaLabel = "";
  let secondInpuAriaLabel = "";
  let inputObject = {};
  let method = null;

  switch (info) {
    case "name":
      title = "Editar nombre";
      successMessage = "El nombre se ha cambiado correctamente";
      inputLabel = "Nombre escogido";
      secondInputLabel = "Apellido escogido";
      inputAriaLabel = "new-name";
      secondInpuAriaLabel = "new-lastname";
      method = services.changeName;
      break;
    case "email":
      title = "Editar email";
      successMessage = "El email se ha cambiado correctamente";
      inputLabel = "Nuevo email";
      inputAriaLabel = "new-email";
      method = services.changeUserEmail;
      break;
    case "username":
      title = "Modificar usuario";
      successMessage = "El nombre de usuario se ha cambiado correctamente";
      inputLabel = "Nombre de usuario";
      inputAriaLabel = "new-username";
      method = services.changeUsername;
      break;
    default:
  }

  /**
   * Sends the user's data to update it in the database
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    inputObject = { ...inputObject, input, secondInput: inputLastname.input };
    try {
      await method(inputObject, token);
      setSuccess(true);
    } catch (error) {
      const { response } = error;
      const { data } = response;
      console.log(data.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "new-lastname") {
      inputLastname.setUserInput(e.target.value);
    } else {
      setUserInput(e.target.value);
    }
  };

  return (
    <Layout>
      <Grid container direction="column" sx={{ width: "auto" }}>
        <Grid item>
          <h3>{title}</h3>
        </Grid>
        <Grid container item direction="column">
          <Grid>
            <form onSubmit={handleSubmit}>
              {/* If the user is going to change their name, must change name and lastname */}
              {info === "name" ? (
                <div className="container-input complete-name">
                  <div>
                    <span>{inputLabel}</span>
                    <TextField
                      inputProps={{ "aria-label": inputAriaLabel }}
                      name="new-name"
                      hiddenLabel
                      fullWidth
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div>
                    <span>{secondInputLabel}</span>
                    <TextField
                      inputProps={{ "aria-label": secondInpuAriaLabel }}
                      name="new-lastname"
                      hiddenLabel
                      fullWidth
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
              ) : (
                <div className="container-input">
                  <div>
                    <span>{inputLabel}</span>
                    <TextField
                      inputProps={{ "aria-label": inputAriaLabel }}
                      hiddenLabel
                      fullWidth
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
              )}
              <div>
                <Button variant="contained" color="secondary" type="submit">
                  Cambiar
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
        {success && (
          <Grid item>
            <span>{successMessage}</span>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default EditEmail;
