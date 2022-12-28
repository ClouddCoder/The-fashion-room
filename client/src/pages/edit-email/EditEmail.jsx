import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { changeUserEmail } from "../../services/user";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import useUserInput from "../../hooks/useUserInput";
import "./EditEmail.css";

function EditEmail() {
  const { input, setUserInput } = useUserInput();
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);

  /**
   * Sends the user's new email to update it in the database
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changeUserEmail(input, token);
      console.log(res.data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            Editar email
          </CustomTypography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <div className="email-input">
              <CustomTypography variant="body2">Email nuevo</CustomTypography>
              <TextField
                inputProps={{ "aria-label": "newEmail" }}
                hiddenLabel
                fullWidth
                onChange={handleChange}
                variant="filled"
                size="small"
              />
            </div>
            <div>
              <Button variant="contained" color="secondary" type="submit">
                Cambiar
              </Button>
            </div>
          </form>
        </Grid>
        {success && (
          <Grid item>
            <CustomTypography variant="body2">
              El email se ha cambiado correctamente
            </CustomTypography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default EditEmail;
