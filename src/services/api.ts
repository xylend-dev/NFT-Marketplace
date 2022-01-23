import axios from "axios";
import { MetadataJson } from "@metaplex/js";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
