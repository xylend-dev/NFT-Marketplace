import {
  SolanaBalanceResponse,
  SolanaErrorResponse,
  SolanaTokenSupplyResponse,
} from "../types/types";
import { api } from "./api";

export const getWalletBalance = async (walletAddress: string) => {
  const walletBalanceResponse = await api.post<SolanaBalanceResponse>("/", {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [walletAddress],
  });
  const walletBalance = walletBalanceResponse.data["result"]["value"];

  return walletBalance;
};

export const getMintSupply = async (mint: string) => {
  const mintSupplyResponse = await api.post<
    SolanaTokenSupplyResponse | SolanaErrorResponse
  >("/", {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenSupply",
    params: [mint],
  });
  let mintSupply = 0;
  if (!("error" in mintSupplyResponse.data)) {
    mintSupply = Number(mintSupplyResponse.data["result"]["value"]["amount"]);
  }

  return mintSupply;
};
