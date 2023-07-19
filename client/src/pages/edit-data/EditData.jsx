import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as services from "../../services/user";
import AuthContext from "../../context/auth-context/AuthContext";
import Layout from "../../components/layout/Layout";
import useUserInput from "../../utils/hooks/useUserInput";
import useError from "../../utils/hooks/useError";
import { checkScreenSize } from "../../utils/MUIMediaQuery";
import useOpenComponent from "../../utils/hooks/useOpenComponent";
import Modal from "../../components/modal/Modal";
import "./EditData.css";

/**
 * Component to edit user's data. This edits the user's name, email or username.
 * @returns {JSX.Element} - EditData component.
 */
function EditEmail() {
  const { info } = useParams();

  const navigate = useNavigate();

  const { input, setUserInput } = useUserInput();
  const inputLastname = useUserInput();

  const { error, setInputError } = useError();

  const { open, setOpenComponent } = useOpenComponent();

  const { token } = useContext(AuthContext);

  const screenSize = checkScreenSize();

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
      successMessage = "Nombre actualizado";
      inputLabel = "Nombre escogido";
      secondInputLabel = "Apellido escogido";
      inputAriaLabel = "new-name";
      secondInpuAriaLabel = "new-lastname";
      method = services.changeName;
      break;
    case "email":
      title = "Editar email";
      successMessage = "Email actualizado";
      inputLabel = "Nuevo email";
      inputAriaLabel = "new-email";
      method = services.changeUserEmail;
      break;
    case "username":
      title = "Modificar usuario";
      successMessage = "Usuario actualizado";
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
      setOpenComponent(true);
    } catch (err) {
      const { response } = err;
      const { data } = response;
      setInputError({ ...error, message: data.message });
    }
  };

  const handleChange = (e) => {
    setInputError({ ...error, message: "" });
    if (e.target.name === "new-lastname") {
      inputLastname.setUserInput(e.target.value);
    } else {
      setUserInput(e.target.value);
    }
  };

  return (
    <Layout>
      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "400px", p: 2 }}
        rowSpacing={4}
      >
        <Grid item>
          <h3>{title}</h3>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="form-container">
                  {/* If the user is going to change their name, must change name and lastname */}
                  {info === "name" ? (
                    <div className="container-input complete-name__fields">
                      <section className="complete-name__field">
                        <span>{inputLabel}</span>
                        <TextField
                          error={Boolean(error.message)}
                          helperText={error.message}
                          inputProps={{ "aria-label": inputAriaLabel }}
                          name="new-name"
                          hiddenLabel
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      </section>
                      <section className="complete-name__field">
                        <span>{secondInputLabel}</span>
                        <TextField
                          error={Boolean(error.message)}
                          helperText={error.message}
                          inputProps={{ "aria-label": secondInpuAriaLabel }}
                          name="new-lastname"
                          hiddenLabel
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      </section>
                    </div>
                  ) : (
                    <div className="container-input">
                      <div className="container-input__field">
                        <span>{inputLabel}</span>
                        <TextField
                          error={Boolean(error.message)}
                          helperText={error.message}
                          inputProps={{ "aria-label": inputAriaLabel }}
                          hiddenLabel
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-button">
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      fullWidth={screenSize === "phone"}
                    >
                      Cambiar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Modal state={open}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              p: "20px",
            }}
            rowSpacing={2}
          >
            <Grid item>
              <h3 className="modal-window__title">{successMessage}</h3>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpenComponent(false);
                  navigate("/my-data");
                }}
                fullWidth
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    </Layout>
  );
}

export default EditEmail;
