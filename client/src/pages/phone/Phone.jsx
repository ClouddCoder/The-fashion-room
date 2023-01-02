import React, { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import AuthContext from "../../context/auth-context/AuthContext";
import { getPhone, setPhone } from "../../services/user";
import useUserInput from "../../hooks/useUserInput";
import useError from "../../hooks/useError";

function Phone() {
  const { input, setUserInput } = useUserInput();
  const { error, setInputError } = useError();
  const [openModal, setOpenModal] = useState(false);
  const { token } = useContext(AuthContext);
  const [listPhone, setListPhone] = useState([]);

  const getPhoneList = async () => {
    try {
      const response = await getPhone(token);
      setListPhone(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPhoneList();
  }, [openModal]);

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
      <Grid container direction="column" sx={{ width: "auto" }}>
        <Grid item>
          <CustomTypography variant="h3">Teléfonos</CustomTypography>
        </Grid>
        <Grid item>
          <CustomTypography variant="body2">
            Selecciona o agrega un número celular
          </CustomTypography>
        </Grid>
        <Grid item container direction="column">
          {listPhone.map((phone, index) => (
            <Grid item key={index}>
              <CustomTypography variant="body2">{phone.phone_number}</CustomTypography>
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
