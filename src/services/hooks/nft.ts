import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { getWalletNftList } from "../fetchers/nft";

export function useWalletNftList(walletPublicKey: PublicKey | null) {
  const { data } = useSWR(
    walletPublicKey ? ["walletNftList", walletPublicKey] : null,
    async () => await getWalletNftList(walletPublicKey)
  );

  data?.sort(
    (nft1, nft2) =>
      nft1.collection?.family.localeCompare(nft2.collection?.family) ||
      nft1.name.localeCompare(nft2.name)
  );

  return data;
}
