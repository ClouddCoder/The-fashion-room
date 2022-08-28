import React, { useState } from "react";
import AuthContext from "./AuthContext";

/**
 * Estados que se usaran en el contexto global del usuario
 */
function AuthState(props) {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, userName, setUserName, userId, setUserId, token, setToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
