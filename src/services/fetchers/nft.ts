import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { connection } from "../../config/solanaNetwork";
import api from "../api";
import { PublicKey } from "@solana/web3.js";

export const getNftMetadata = async (arweaveUri: string) => {
  const nftMetadata = await api.get<MetadataJson>(arweaveUri);
  return nftMetadata.data;
};

export const getWalletNftList = async (walletPublicKey: PublicKey | null) => {
  if (!walletPublicKey) {
    return [];
  }

  const walletNft = await Metadata.findDataByOwner(connection, walletPublicKey);
  const walletNftMetadata = await Promise.all(
    walletNft.map(async (nft) => {
      const nftMetadata = await getNftMetadata(nft.data.uri);
      return nftMetadata;
    })
  );

  return walletNftMetadata;
};