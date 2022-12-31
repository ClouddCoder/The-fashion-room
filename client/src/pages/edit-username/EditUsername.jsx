import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import { changeUsername } from "../../services/user";
import Layout from "../../components/layout/Layout";
import useUserInput from "../../hooks/useUserInput";

function EditUsername() {
  const { input, setUserInput } = useUserInput();
  const [success, setSuccess] = useState("");
  const { token } = useContext(AuthContext);
  /**
   * Sends the user's new username to update it in the database
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changeUsername(input, token);
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
            Editar username
          </CustomTypography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <div className="username-input">
              <CustomTypography variant="body2">Nuevo username</CustomTypography>
              <TextField
                inputProps={{ "aria-label": "new-username" }}
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
              El username se ha cambiado correctamente
            </CustomTypography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default EditUsername;
