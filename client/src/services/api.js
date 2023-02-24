import axios from "axios";

// eslint-disable-next-line import/no-mutable-exports
export let baseURL = "";

switch (process.env.NODE_ENV) {
  case "dev":
    baseURL = process.env.REACT_APP_BASE_URL_DEV;
    break;
  default:
    baseURL = process.env.REACT_APP_BASE_URL;
}

const instance = axios.create({
  baseURL,
});

export default instance;
