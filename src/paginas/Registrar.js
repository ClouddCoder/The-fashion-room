import {NavegacionHome} from "../componentes/Navegacion";
import React, {useEffect, useState} from "react";

const Registrar = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  return (
    <div>
      <form action="">
        <h2>Registrarse</h2>
        <label htmlFor="">Usuario</label>
        <input
          type="text"
          name="usuario"
          id="usuario"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br />
        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br />
        <button>Registrar</button>
      </form>
      <br />
      <NavegacionHome />
    </div>
  );
};

export default Registrar;
