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
      return {
        mint: nft.mint,
        metadata: nftMetadata,
      };
    })
  );

  return walletNftMetadata;
};

export const getMetadataByMint = async (
  mint: string,
  queryExtraData: boolean = true
) => {
  const mintPublicKey = new PublicKey(mint);
  const pda = await Metadata.getPDA(mintPublicKey);
  const nft = (await Metadata.load(connection, pda)).data;
  const metadata = await getNftMetadata(nft.data.uri);
  const likes = queryExtraData ? 0 : undefined;

  return {
    pda,
    nft,
    metadata,
    likes,
  };
};
