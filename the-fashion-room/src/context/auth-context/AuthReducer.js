import { authActions } from "../../actions/authActions";

const loggedJSON = window.localStorage.getItem("logged");
const user = JSON.parse(loggedJSON);

export const authInitialState = {
  auth: user?.userAuth || false,
  userId: user?.userId || "",
  userName: user?.userName || "",
  userLastname: "",
  userEmail: "",
  userPassword: "",
  token: user?.token || "",
};

export function authReducer(state, action) {
  switch (action.type) {
    case authActions.SET_AUTH:
      return { ...state, auth: action.payload };
    case authActions.SET_USER_ID:
      return { ...state, userId: action.payload };
    case authActions.SET_USERNAME:
      return { ...state, [action.payload.target.name]: action.payload.target.value };
    case authActions.SET_LASTNAME:
      return { ...state, [action.payload.target.name]: action.payload.target.value };
    case authActions.SET_EMAIL:
      return { ...state, [action.payload.target.name]: action.payload.target.value };
    case authActions.SET_PASSWORD:
      return { ...state, [action.payload.target.name]: action.payload.target.value };
    case authActions.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
