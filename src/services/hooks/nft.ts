import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { getWalletNftList } from "../fetchers/nft";

export function useWalletNftList(walletPublicKey: PublicKey | null) {
  const { data } = useSWR(
    walletPublicKey ? ["walletNftList", walletPublicKey] : null,
    async () => await getWalletNftList(walletPublicKey)
  );

  return data;
}
