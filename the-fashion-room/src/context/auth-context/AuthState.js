import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import { authInitialState, authReducer } from "./AuthReducer";
import { authActions } from "../../actions/authActions";

/**
 * Estados que se usaran en el contexto global del usuario
 */
function AuthState(props) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const setAuth = (boolean) => {
    return dispatch({ type: authActions.SET_AUTH, payload: boolean });
  };

  const setUserId = (id) => {
    return dispatch({ type: authActions.SET_USER_ID, payload: id });
  };

  const setUser = (user) => {
    return dispatch({ type: authActions.SET_USER, payload: user });
  };

  const setUserName = (name) => {
    return dispatch({ type: authActions.SET_USERNAME, payload: name });
  };

  const setUserLastname = (lastname) => {
    return dispatch({ type: authActions.SET_LASTNAME, payload: lastname });
  };

  const setUserEmail = (email) => {
    return dispatch({ type: authActions.SET_EMAIL, payload: email });
  };

  const setUserPassword = (password) => {
    return dispatch({ type: authActions.SET_PASSWORD, payload: password });
  };

  const setToken = (token) => {
    return dispatch({ type: authActions.SET_TOKEN, payload: token });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        setAuth,
        userId: state.userId,
        setUserId,
        user: state.user,
        setUser,
        userName: state.userName,
        setUserName,
        userLastname: state.userLastname,
        setUserLastname,
        userEmail: state.userEmail,
        setUserEmail,
        userPassword: state.userPassword,
        setUserPassword,
        token: state.token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
