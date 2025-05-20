import axios from "axios";
import env from "../../env";

const config = {
  baseURL: env.API_URL,
  headers: {
    apikey: env.API_KEY
  }
};

const currencyAPI = axios.create(config);
export default currencyAPI;