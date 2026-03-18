import axios from "axios";

const urlLocal = "http://localhost:3000/";
const urlServer = "https://server-rumbonica.onrender.com/";

export const turismoApi = axios.create({
  baseURL: urlServer,
});

export const turismoAPiFecth = urlLocal;
