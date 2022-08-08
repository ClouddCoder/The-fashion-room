import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthState(props) {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userName, setUserName, userId, setUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
