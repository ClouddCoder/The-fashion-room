import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthState(props) {
  const [auth, setAuth] = useState(false);
  return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
}

export default AuthState;
