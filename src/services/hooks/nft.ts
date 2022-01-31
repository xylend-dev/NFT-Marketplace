import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { getWalletNftList } from "../fetchers/nft";

export function useWalletNftList(walletPublicKey: PublicKey | null) {
  const { data } = useSWR(
    walletPublicKey ? ["walletNftList", walletPublicKey] : null,
    async () => await getWalletNftList(walletPublicKey)
  );

  if (!data) {
    return data;
  }

  const undefinedNftFamily = data.filter((nft) => nft.collection === undefined);
  undefinedNftFamily.sort((nft1, nft2) => nft1.name.localeCompare(nft2.name));

  const definedNftFamily = data.filter((nft) => nft.collection !== undefined);
  definedNftFamily.sort(
    (nft1, nft2) =>
      nft1.collection!.family.localeCompare(nft2.collection!.family) ||
      nft1.name.localeCompare(nft2.name)
  );

  return [...definedNftFamily, ...undefinedNftFamily];
}
