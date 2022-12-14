import React, { useState, useContext } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../components/custom-typography/CustomTypography";
import Layout from "../../components/layout/Layout";
import "./EditEmail.css";

function EditEmail() {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      "http://localhost:3050/api/edit-email",
      {
        email,
        newEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "newEmail":
        setNewEmail(e.target.value);
        break;
      default:
    }
  };

  return (
    <Layout>
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            Editar email
          </CustomTypography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <div className="email-input">
            <CustomTypography variant="body2">Email anterior</CustomTypography>
            <TextField
              inputProps={{ "aria-label": "email" }}
              hiddenLabel
              fullWidth
              onChange={handleChange}
              variant="filled"
              size="small"
            />
          </div>
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
              Login
            </Button>
          </div>
        </form>
      </Grid>
    </Layout>
  );
}

export default EditEmail;