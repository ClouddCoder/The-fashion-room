import { ReturnHome } from "../components/Navigation";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const [username, setUsernameReg] = useState({"username": ""});
  const [password, setPasswordReg] = useState({"password": ""});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/insert", {
      method: "POST",
      body: JSON.stringify(username, password),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();

    if (data.length > 0) {
      navigate("/");
    } else {
      console.log("No se pudo registrar");
    }
  };

  const handleChange = (e) => {
    setUsernameReg({...username, [e.target.name]: e.target.value});
    setPasswordReg({...password, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Usuario</label>
        <input
          type="text"
          name="username"
          id="usuario"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          name="password"
          id="contraseña"
          onChange={handleChange}
        />
        <br />
        <Button variant="contained" color="secondary" type="submit">Registrar</Button>
      </form>
      <ReturnHome />
    </div>
  );
};

export default Registrar;
