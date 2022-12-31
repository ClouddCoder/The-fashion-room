import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as services from "../../services/user";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import useUserInput from "../../hooks/useUserInput";
import "./EditData.css";

function EditEmail() {
  const { info } = useParams();
  const { input, setUserInput } = useUserInput();
  const inputLastname = useUserInput();
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);

  // Variables to change the information displayed in the form
  let title = "";
  let successMessage = "";
  let inputTitle = "";
  let inputLabel = "";
  let secondInputLabel = "";
  let inputAriaLabel = "";
  let secondInpuAriaLabel = "";
  let method = null;

  switch (info) {
    case "email":
      title = "Editar email";
      successMessage = "El email se ha cambiado correctamente";
      inputTitle = "Cambia tu email";
      inputLabel = "Nuevo email";
      inputAriaLabel = "new-email";
      method = services.changeUserEmail;
      break;
    case "name":
      title = "Editar nombre";
      successMessage = "El nombre se ha cambiado correctamente";
      inputTitle = "¿Como quieres que te llamemos?";
      inputLabel = "Nombre escogido";
      secondInputLabel = "Apellido escogido";
      inputAriaLabel = "new-name";
      secondInpuAriaLabel = "new-lastname";
      //method = services.changeName;
      break;
    case "username":
      title = "Modificar usuario";
      successMessage = "El nombre de usuario se ha cambiado correctamente";
      //inputTitle = "Escoge tu nuevo usuario";
      inputLabel = "Nombre de usuario";
      inputAriaLabel = "new-username";
      method = services.changeUsername;
      break;
    case "phone":
      title = "Editar teléfono";
      successMessage = "El teléfono se ha cambiado correctamente";
      inputTitle = "Escoge tu nuevo teléfono";
      inputLabel = "Teléfono escogido";
      inputAriaLabel = "new-phone";
      //method = services.changePhone;
      break;
    default:
  }

  /**
   * Sends the user's new email to update it in the database
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await method(input, token);
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
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            {title}
          </CustomTypography>
        </Grid>
        <Grid container item direction="column">
          <Grid item>
            <CustomTypography variant="body2">{inputTitle}</CustomTypography>
          </Grid>
          <Grid>
            <form onSubmit={handleSubmit}>
              {info === "name" ? (
                <div className="container-input complete-name">
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
                  <div>
                    <span>{secondInputLabel}</span>
                    <TextField
                      inputProps={{ "aria-label": secondInpuAriaLabel }}
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
            <CustomTypography variant="body2">{successMessage}</CustomTypography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default EditEmail;
