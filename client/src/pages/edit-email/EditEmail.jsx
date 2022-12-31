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
      await changeUserEmail(input, token);
      setSuccess(true);
    } catch (error) {
      const { response } = error;
      const { data } = response;
      console.log(data.message);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Layout>
      <Grid container direction="column" sx={{ width: "auto" }}>
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
                inputProps={{ "aria-label": "new-email" }}
                hiddenLabel
                fullWidth
                onChange={handleChange}
                variant="outlined"
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
