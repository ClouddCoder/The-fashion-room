import { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import AuthContext from "../../context/auth-context/AuthContext";
import { getPhone, setPhone, deletePhone } from "../../services/user";
import useUserInput from "../../utils/hooks/useUserInput";
import useError from "../../utils/hooks/useError";
import useOpenComponent from "../../utils/hooks/useOpenComponent";
import "./Phone.css";

/**
 * Component to render user's phones and the fields to
 * change or add a new phone.
 * @returns {JSX.Element} - Phone component.
 */
function Phone() {
  const { input, setUserInput } = useUserInput();

  const { error, setInputError } = useError();
  const requestData = useError(); // Shows the error message when there are no phones.

  const openLoader = useOpenComponent();
  const openModal = useOpenComponent();

  const [listPhone, setListPhone] = useState([]);
  const [isPhoneDeleted, setIsPhoneDeleted] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Displays the loader every time the component is re-render.
    openLoader.setOpenComponent(true);

    setInputError({ ...error, constraint: "", message: "" });
  }, []);

  const getPhoneList = async () => {
    try {
      const response = await getPhone(token);
      setListPhone(response.data);
    } catch (err) {
      setListPhone([]);
      const { response } = err;
      const { data } = response;
      const { message, constraint } = data;
      requestData.setInputError({ ...error, constraint, message });
    }

    openLoader.setOpenComponent(false);
  };

  useEffect(() => {
    getPhoneList();
    requestData.setInputError({ ...error, constraint: "", message: "" });
    setUserInput("");
  }, [openModal.open, isPhoneDeleted]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setInputError({ ...error, constraint: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await setPhone(input, token);
      openModal.setOpenComponent(false);
      console.log(response.data.message);
    } catch (err) {
      // eslint-disable-next-line prefer-destructuring
      const constraint = err.response.data.constraint;
      const message = err.response.data.errorMessage;
      setInputError({ ...error, constraint, message });
    }
  };

  return (
    <Layout>
      {openLoader.open && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid
        container
        direction="column"
        sx={{ width: "90%", maxWidth: "500px", p: 2 }}
        rowSpacing={2}
      >
        <Grid item>
          <h3>Teléfonos</h3>
        </Grid>
        <Grid item>
          <span>Selecciona o agrega un número celular</span>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container direction="column" rowSpacing={2}>
                {requestData.error.constraint === "empty" && (
                  <span id="error-message">{requestData.error.message}</span>
                )}
                {listPhone.map((phone, index) => (
                  <Grid item key={index} sx={{ width: "100%" }}>
                    <section className="phones-container">
                      <div className="phone-number-container">
                        <span className="phone-number-field">
                          {phone.phone_number}
                        </span>
                      </div>
                      <IconButton
                        sx={{ flex: 1 }}
                        onClick={() => {
                          deletePhone(phone.phone_id, token);
                          setIsPhoneDeleted(!isPhoneDeleted); // It helps to re-render
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </section>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => openModal.setOpenComponent(true)}
            fullWidth
          >
            Agregar un número celular
          </Button>
          <Modal state={openModal.open}>
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
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px", p: 0 }}
                onClick={() => openModal.setOpenComponent(false)}
              >
                <CloseIcon />
              </IconButton>
              <Grid item>
                <h3 className="modal-window__title">
                  Agregar un número celular
                </h3>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={error.constraint === "phone_number"}
                    helperText={error.message}
                    onChange={handleChange}
                    name="new-phone"
                    variant="outlined"
                    label="Nuevo teléfono"
                    value={input}
                    sx={{ margin: ".5rem 0", width: "100%" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Agregar
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Modal>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Phone;
