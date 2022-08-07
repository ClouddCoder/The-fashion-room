import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthState(props) {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth, userName, setUserName }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
