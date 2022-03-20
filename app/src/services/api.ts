import axios from "axios";
import { endpoint } from "../config/api";

const api = axios.create({
  baseURL: endpoint,
});

export default api;
