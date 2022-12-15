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
  const [success, setSuccess] = useState(false);
  const { email, getEmail } = useEmail();
  const currentPassword = usePassword();
  const newPassword = usePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:3001/api/edit-password", {
        currentPassword: currentPassword.password,
        newPassword: newPassword.password,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3050/api/user-id", {
        params: {
          email,
        },
      });

      const { data } = res;
      setSuccess(true);
      console.log(data);
    } catch (err) {
      throw new Error(err);
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
            error
            helperText="email"
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
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Actualizar
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default EditPassword;
