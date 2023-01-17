import { useState, useEffect, useContext } from "react";
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
import useLoader from "../../utils/hooks/useLoader";

/**
 * Component to render user's phones and the fields to
 * change or add a new phone.
 * @returns {JSX.Element} - Phone component.
 */
function Phone() {
  const { input, setUserInput } = useUserInput();
  const { error, setInputError } = useError();
  const [openModal, setOpenModal] = useState(false);
  const [isPhoneDeleted, setIsPhoneDeleted] = useState(false);
  const { token } = useContext(AuthContext);
  const [listPhone, setListPhone] = useState([]);
  const { loader, setLoaderComponent } = useLoader();

  useEffect(() => {
    // Displays the loader every time the component is re-render.
    setLoaderComponent(true);
  }, []);

  const getPhoneList = async () => {
    try {
      const response = await getPhone(token);
      setListPhone(response.data);
    } catch (err) {
      setListPhone([]);
      console.log(err);
    }

    setLoaderComponent(false);
  };

  useEffect(() => {
    getPhoneList();
  }, [openModal, isPhoneDeleted]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setInputError({ ...error, constraint: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await setPhone(input, token);
      setOpenModal(false);
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
      {loader && (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      )}

      <Grid container direction="column" sx={{ width: "auto" }}>
        <Grid item>
          <h3>Teléfonos</h3>
        </Grid>
        <Grid item>
          <span>Selecciona o agrega un número celular</span>
        </Grid>
        <Grid item container direction="column">
          {listPhone.map((phone, index) => (
            <Grid
              item
              key={index}
              sx={{ width: "200px", display: "flex", justifyContent: "space-around" }}
            >
              <span>{phone.phone_number}</span>
              <IconButton
                onClick={() => {
                  deletePhone(phone.phone_id, token);
                  setIsPhoneDeleted(!isPhoneDeleted); // It helps to re-render
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(true)}
            fullWidth
          >
            Agregar un número celular
          </Button>
          <Modal state={openModal}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              sx={{ width: "100%", height: "100%", position: "relative", p: "20px" }}
            >
              <IconButton
                sx={{ position: "absolute", top: "20px", right: "20px", p: 0 }}
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon />
              </IconButton>
              <Grid item>
                <h1 className="modal-window__title">Agregar un número celular</h1>
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
                  <Button variant="contained" color="primary" type="submit" fullWidth>
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
