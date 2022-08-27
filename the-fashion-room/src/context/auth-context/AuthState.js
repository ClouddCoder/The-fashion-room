import React, { useState } from "react";
import AuthContext from "./AuthContext";

/**
 * Estados que se usaran en el contexto global del usuario
 */
function AuthState(props) {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, userName, setUserName, userId, setUserId, token, setToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
