import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import { authInitialState, authReducer } from "./AuthReducer";
import { authActions } from "../../actions/authActions";

/**
 * Estados que se usaran en el contexto global del usuario
 */
function AuthState(props) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const setAuth = () => {
    return dispatch({ type: authActions.SET_AUTH, payload: true });
  };

  const setUserId = (id) => {
    return dispatch({ type: authActions.SET_USER_ID, payload: id });
  };

  const setUserName = (username) => {
    return dispatch({ type: authActions.SET_USERNAME, payload: username });
  };

  const setUserLastname = (lastname) => {
    return dispatch({ type: authActions.SET_LASTNAME, payload: lastname });
  };

  const setUserEmail = (e) => {
    return dispatch({ type: authActions.SET_EMAIL, payload: e });
  };

  const setUserPassword = (e) => {
    return dispatch({ type: authActions.SET_PASSWORD, payload: e });
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
        userName: state.userName,
        setUserName,
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
