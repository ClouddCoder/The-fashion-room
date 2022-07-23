import {ReturnHome} from "../components/Navigation";
import React, {useEffect, useState} from "react";
//import Axios from "axios";

const Registrar = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  /*
  const register = () => {
    Axios.post("http://localhost:3000/registrar", {
      username: usernameReg,
      password: passwordReg,
    }).then(res => {
      console.log(res);
    });
  };
  */

  return (
    <div>
      <h2>Registrarse</h2>
      <label htmlFor="">Usuario</label>
      <input
        type="text"
        name="usuario"
        id="usuario"
        onChange={e => {
          setUsernameReg(e.target.value);
        }}
      />
      <br />
      <label htmlFor="">Contraseña</label>
      <input
        type="password"
        name="contraseña"
        id="contraseña"
        onChange={e => {
          setPasswordReg(e.target.value);
        }}
      />
      <br />
      <button>Registrar</button>
      <br />
      <ReturnHome />
    </div>
  );
};

export default Registrar;
