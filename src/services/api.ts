import axios from "axios";

/* API is not used yet */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export default api;
