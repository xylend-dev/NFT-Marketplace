import { PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import {
  getMetadataByMint,
  getWalletNftList,
  getLastNftCreated,
  getPopularNfts,
  getWalletBalance,
} from "../fetchers/nft";

export function useWalletNftList(walletPublicKey: PublicKey | null) {
  const { data } = useSWR(
    walletPublicKey ? ["walletNftList", walletPublicKey] : null,
    async () => await getWalletNftList(walletPublicKey)
  );

  if (!data) {
    return data;
  }

  const undefinedNftFamily = data.filter(
    (nft) => nft.metadata.collection === undefined
  );
  undefinedNftFamily.sort((nft1, nft2) =>
    nft1.metadata.name.localeCompare(nft2.metadata.name)
  );

  const definedNftFamily = data.filter(
    (nft) => nft.metadata.collection !== undefined
  );
  definedNftFamily.sort(
    (nft1, nft2) =>
      nft1.metadata.collection!.family.localeCompare(
        nft2.metadata.collection!.family
      ) || nft1.metadata.name.localeCompare(nft2.metadata.name)
  );

  return [...definedNftFamily, ...undefinedNftFamily];
}

export function useNft(mint: string) {
  const { data, error } = useSWR(
    ["nft", mint],
    async () => await getMetadataByMint(mint)
  );

  return { data, error };
}

export function useWalletBalance(walletPublicKey: PublicKey | null) {
  const { data, error } = useSWR(
    walletPublicKey ? ["walletBalance", walletPublicKey] : null,
    async () => await getWalletBalance(walletPublicKey)
  );

  return { data, error };
}

export function usePopularNfts() {
  const { data, error } = useSWR(
    ["popularNfts"],
    async () => await getPopularNfts()
  );

  let popularNfts = data;
  if (data) {
    popularNfts = data.sort(
      (nft1, nft2) =>
        (nft1.extraData?.numberLikes || 0) - (nft2.extraData?.numberLikes || 0)
    );
  }

  return { popularNfts, error };
}

export function useLastNftCreated() {
  const { data } = useSWR(
    ["lastNftCreated"],
    async () => await getLastNftCreated()
  );

  return data;
}
