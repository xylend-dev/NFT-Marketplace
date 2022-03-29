import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { MetadataJson } from "@metaplex/js";
import { connection } from "../../config/solanaNetwork";
import api from "../api";
import { PublicKey } from "@solana/web3.js";
import { isBackendEnabled, validateIsBackendEnabled } from "../../config/api";
import { NftCreatedData, NftExtraData } from "../../types/types";
import { removeUndefined } from "../../utils/general";

export const getNftMetadata = async (arweaveUri: string) => {
  const nftMetadata = await api.get<MetadataJson>(arweaveUri);
  return nftMetadata.data;
};

export const getWalletBalance = async (walletPublicKey: PublicKey | null) => {
  if (!walletPublicKey) {
    throw new Error("Carteira não carregada");
  }
  const walletBalanceLamports = await connection.getBalance(walletPublicKey);
  const walletBalanceSol = walletBalanceLamports / 1e9;

  return walletBalanceSol;
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
    ? (await api.get(`/nft/token/${mint}`)).data
    : undefined;

  return {
    pda,
    nft,
    metadata,
    extraData,
  };
};

export const getPopularNfts = async () => {
  validateIsBackendEnabled();

  const popularNfts = (await api.get<Array<NftExtraData>>("/nft/like")).data;
  const popularNftsData = (
    await Promise.all(
      popularNfts.map(async (popularNft) => {
        try {
          const nftData = await getMetadataByMint(popularNft.mint);
          return nftData;
        } catch {
          console.log(`NFT ${popularNft.mint} não encontrado`);
        }
      })
    )
  ).filter(removeUndefined);

  return popularNftsData;
};

export const getLastNftsCreated = async () => {
  validateIsBackendEnabled();

  const lastNftsCreated = (await api.get<Array<NftCreatedData>>("/nft/create")).data;
  const lastNftsCreatedData = (await Promise.all(
    lastNftsCreated.map(async (lastNftCreated) => {
      try {
        const nftData = await getMetadataByMint(lastNftCreated.mint);
        return nftData;
      } catch {
        console.log(`NFT ${lastNftCreated.mint} não encontrado`);
      }
    })
  )).filter(removeUndefined);

  return lastNftsCreatedData;
};
