import axios from "axios";
import env from "react-dotenv";

// eslint-disable-next-line import/no-mutable-exports
export let baseURL = "";

switch (env.NODE_ENV) {
  case "dev":
    baseURL = env.BASE_URL_DEV;
    break;
  default:
    baseURL = env.BASE_URL;
}

const instance = axios.create({
  baseURL,
});

export default instance;
