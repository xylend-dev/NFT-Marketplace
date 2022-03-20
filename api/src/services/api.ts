import axios from "axios";

let endpoint = "https://api.devnet.solana.com";
if (process.env.NODE_ENV === "production") {
  endpoint = "http://api.mainnet-beta.solana.com";
}

const api = axios.create({
  baseURL: endpoint,
});

export { endpoint, api };
