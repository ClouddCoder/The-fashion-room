import { authActions } from "../../actions/authActions";

const loggedJSON = window.localStorage.getItem("logged");
const user = JSON.parse(loggedJSON);

export const authInitialState = {
  auth: user?.userAuth || false,
  userId: user?.userId || "",
  user: user?.userName || "", // nombre del usuario que se muestra en el navbar
  username: user?.username || "", // nombre que se mostrara en el perfil del usuario
  userName: "", // valor de input del nombre del usuario
  userLastname: "", // valor de input del apellido del usuario
  userEmail: "", // valor de input del email del usuario
  userPassword: "", // valor de input del password del usuario
  token: user?.token || "",
};

export function authReducer(state, action) {
  switch (action.type) {
    case authActions.SET_AUTH:
      return { ...state, auth: action.payload };
    case authActions.SET_USER_ID:
      return { ...state, userId: action.payload };
    case authActions.SET_USER:
      return { ...state, user: action.payload };
    case authActions.SET_USER_NAME:
      return { ...state, username: action.payload };
    case authActions.SET_USERNAME:
      return { ...state, userName: action.payload };
    case authActions.SET_LASTNAME:
      return { ...state, userLastname: action.payload };
    case authActions.SET_EMAIL:
      return { ...state, userEmail: action.payload };
    case authActions.SET_PASSWORD:
      return { ...state, userPassword: action.payload };
    case authActions.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
