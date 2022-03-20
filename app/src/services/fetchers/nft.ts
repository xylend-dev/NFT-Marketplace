import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { connection } from "../../config/solanaNetwork";
import api from "../api";
import { PublicKey } from "@solana/web3.js";
import { isBackendEnabled } from "../../config/api";
import { NftExtraData } from "../../types/types";

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

export const getMetadataByMint = async (mint: string) => {
  const mintPublicKey = new PublicKey(mint);
  const pda = await Metadata.getPDA(mintPublicKey);
  const nft = (await Metadata.load(connection, pda)).data;
  const metadata = await getNftMetadata(nft.data.uri);

  const extraData: NftExtraData | undefined = isBackendEnabled
    ? (await api.get(`/nft/${mint}`)).data
    : undefined;

  return {
    pda,
    nft,
    metadata,
    extraData,
  };
};

export const getLastNftCreated = async () => {
  const mints = ["8Vujaia92NYTcm62T2JZ17LmraAFHuevuJvTkPmNWwb8"];
  const lastNftCreated = await Promise.all(
    mints.map(async (mint) => {
      return getMetadataByMint(mint);
    })
  );

  return lastNftCreated;
};
