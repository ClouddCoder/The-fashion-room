import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

// Custom hook to get the user's email
const useEmail = () => {
  const [email, setEmail] = useState("");

  const getEmail = (input) => setEmail(input);

  return {
    email,
    getEmail,
  };
};

function EditPassword() {
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);
  const { email, getEmail } = useEmail();
  const currentPassword = usePassword();
  const newPassword = usePassword();

  // Sends the user's new password to change the current one using the user's id.
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:3001/api/edit-password", {
        userId,
        newPassword: newPassword.password,
      });
    } catch (err) {
      setError({ error: true, errorMessage: err.message });
      throw new Error(err);
    }
  };

  // Sends the user's email to check if it exists in the database.
  // If it does, the function will return the user's id.
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3050/api/user-id", {
        params: {
          email,
        },
      });

      const { data } = res;
      setUserId(data.userId);
      setSuccess(true);
    } catch (err) {
      const { response } = err;
      console.log(response.data.message);
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        getEmail(e.target.value);
        break;
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
      <div className="email-input">
        <div className="email-input__title">
          <h1>Escribe tu correo</h1>
        </div>
        <form onSubmit={handleSubmitEmail}>
          <TextField
            error={error.error}
            helperText={error.errorMessage}
            onChange={handleChange}
            name="email"
            variant="outlined"
            label="Email"
            value={email}
            sx={{ margin: ".5rem 0", width: "100%" }}
          />
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Continuar
          </Button>
        </form>
      </div>
      {success && (
        <div className="password-inputs">
          <div className="password-inputs__title">
            <h1>Cambiar contraseña</h1>
          </div>
          <form onSubmit={handleSubmitPassword}>
            <TextField
              error={error.error}
              helperText={error.errorMessage}
              onChange={handleChange}
              name="currentPassword"
              variant="outlined"
              label="Contraseña actual"
              type="password"
              value={currentPassword.password}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
            <TextField
              error={error.error}
              helperText={error.errorMessage}
              onChange={handleChange}
              name="newPassword"
              variant="outlined"
              label="Contraseña nueva"
              type="password"
              value={newPassword.password}
              sx={{ margin: ".5rem 0", width: "100%" }}
            />
          </form>
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Actualizar
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default EditPassword;
