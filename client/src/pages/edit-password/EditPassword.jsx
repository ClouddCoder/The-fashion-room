import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import "./EditPassword.css";

// Custom hook to get the user's password
const usePassword = () => {
  const [password, setPassword] = useState("");

  const getPassword = (input) => setPassword(input);

  return {
    password,
    getPassword,
  };
};

function EditPassword() {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const currentPassword = usePassword();
  const newPassword = usePassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.put("http://localhost:3001/api/edit-password", {
      currentPassword: currentPassword.password,
      newPassword: newPassword.password,
    });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "currentPassword":
        currentPassword.getPassword(e.target.value);
        break;
      case "newPassword":
        newPassword.getPassword(e.target.value);
        break;
      default:
    }
  };

  return (
    <Layout>
      <div className="password-inputs">
        <div className="password-inputs__title">
          <h1>Cambiar contraseña</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            error
            helperText="tim"
            onChange={handleChange}
            name="currentPassword"
            variant="outlined"
            label="Contraseña actual"
            type="password"
            value={currentPassword.password}
            sx={{ margin: ".5rem 0", width: "100%" }}
          />
          <TextField
            error
            helperText="tom"
            onChange={handleChange}
            name="newPassword"
            variant="outlined"
            label="Contraseña nueva"
            type="password"
            value={newPassword.password}
            sx={{ margin: ".5rem 0", width: "100%" }}
          />
        </form>
      </div>
    </Layout>
  );
}

export default EditPassword;
