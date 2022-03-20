import { SolanaBalanceResponse } from "../types/types";
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
