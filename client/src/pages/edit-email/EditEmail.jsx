import React, { useState, useContext } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AuthContext from "../../context/auth-context/AuthContext";
import CustomTypography from "../../commons/custom-typography/CustomTypography";
import Navbar from "../../commons/navbar/Navbar";
import Footer from "../../commons/footer/Footer";

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
    <div className="container">
      <Navbar />
      <Grid container direction="column">
        <Grid item>
          <CustomTypography variant="h3" sx={{ fontWeight: "bold" }}>
            Editar email
          </CustomTypography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <CustomTypography variant="body2">Email anterior</CustomTypography>
          <TextField
            hiddenLabel
            fullWidth
            onChange={handleChange}
            name="email"
            label="email"
            variant="filled"
            size="small"
          />
          <CustomTypography variant="body2">Email nuevo</CustomTypography>
          <TextField
            hiddenLabel
            fullWidth
            onChange={handleChange}
            name="newEmail"
            label="newEmail"
            variant="filled"
            size="small"
          />
        </form>
      </Grid>
      <Footer />
    </div>
  );
}

export default EditEmail;
