import {NavegacionHome} from "../componentes/Navegacion";
import React, {useEffect, useState} from "react";

const Ingresar = () => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  return (
    <div>
      <form action="">
        <h2>Iniciar sesion</h2>
        <label htmlFor="">Usuario</label>
        <input
          type="text"
          name="usuario"
          id="usuario"
          onChange={(e) => {
            setUsernameLog(e.target.value);
          }}
        />
        <br />
        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          onChange={(e) => {
            setPasswordLog(e.target.value);
          }}
        />
        <br />
        <button>Login</button>
      </form>
      <br />
      <NavegacionHome />
    </div>
  );
};

export default Ingresar;
