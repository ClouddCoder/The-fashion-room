import { useReducer, useMemo } from "react";
import AuthContext from "./AuthContext";
import { authInitialState, authReducer } from "./authReducer";
import { authActions } from "../../actions/authActions";

/**
 * Estados que se usaran en el contexto global del usuario
 */
function AuthState({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const setAuth = (boolean) => {
    dispatch({ type: authActions.SET_AUTH, payload: boolean });
  };

  const setUserId = (id) => {
    dispatch({ type: authActions.SET_USER_ID, payload: id });
  };

  const setUser = (user) => {
    dispatch({ type: authActions.SET_USER, payload: user });
  };

  const setUsername = (user) => {
    dispatch({ type: authActions.SET_USER_NAME, payload: user });
  };

  const setUserName = (name) => {
    dispatch({ type: authActions.SET_USERNAME, payload: name });
  };

  const setUserLastname = (lastname) => {
    dispatch({ type: authActions.SET_LASTNAME, payload: lastname });
  };

  const setUserEmail = (email) => {
    dispatch({ type: authActions.SET_EMAIL, payload: email });
  };

  const setUserPassword = (password) => {
    dispatch({ type: authActions.SET_PASSWORD, payload: password });
  };

  const setToken = (token) => {
    dispatch({ type: authActions.SET_TOKEN, payload: token });
  };

  const valueProps = useMemo(
    () => ({
      auth: state.auth,
      setAuth,
      userId: state.userId,
      setUserId,
      user: state.user,
      setUser,
      username: state.username,
      setUsername,
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
    }),
    [
      state.auth,
      state.userId,
      state.user,
      state.userName,
      state.userLastname,
      state.userEmail,
      state.userPassword,
      state.token,
    ],
  );

  return <AuthContext.Provider value={valueProps}>{children}</AuthContext.Provider>;
}

export default AuthState;
