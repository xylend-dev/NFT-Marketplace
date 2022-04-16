import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { AuctionExtended } from "@metaplex-foundation/mpl-auction";
import { MetadataJson } from "@metaplex/js";
import { programs } from "@metaplex/js";
import { connection } from "../../config/solanaNetwork";
import api from "../api";
import { PublicKey } from "@solana/web3.js";
import { isBackendEnabled, validateIsBackendEnabled } from "../../config/api";
import { IsLikeAdded, NftCreatedData, NftExtraData } from "../../types/types";
import { removeUndefined } from "../../utils/general";
import {
  SOLRIGAMI_STORE,
  validatehasSolrigamiStore,
} from "../../config/solrigamiStore";
import { StringPublicKey } from "@metaplex-foundation/mpl-core";

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

export const getIsLikeAdded = async (
  mint: string,
  walletPublicKey: PublicKey | null
) => {
  validateIsBackendEnabled();

  if (!walletPublicKey || !mint) {
    return false;
  }

  const isLikeAdded = (
    await api.get<IsLikeAdded>("/nft/like/check", {
      params: { mint: mint, walletAddress: walletPublicKey.toBase58() },
    })
  ).data;

  return isLikeAdded.isLikeAdded || false;
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

  const lastNftsCreated = (await api.get<Array<NftCreatedData>>("/nft/create"))
    .data;
  const lastNftsCreatedData = (
    await Promise.all(
      lastNftsCreated.map(async (lastNftCreated) => {
        try {
          const nftData = await getMetadataByMint(lastNftCreated.mint);
          return nftData;
        } catch {
          console.log(`NFT ${lastNftCreated.mint} não encontrado`);
        }
      })
    )
  ).filter(removeUndefined);

  return lastNftsCreatedData;
};

export const getAuctionData = async (
  auctionManager: programs.metaplex.AuctionManager
) => {
  const auction = await auctionManager.getAuction(connection);
  const auctionExtendedKey = await AuctionExtended.getPDA(
    auctionManager.data.vault
  );
  const auctionExtended = await AuctionExtended.load(
    connection,
    auctionExtendedKey
  );
  const vault = await programs.vault.Vault.load(
    connection,
    auctionManager.data.vault
  );
  const safetyDepositBoxes = await vault.getSafetyDepositBoxes(connection);

  if (safetyDepositBoxes.length > 0) {
    try {
      const nftData = await getMetadataByMint(
        safetyDepositBoxes[0].data.tokenMint
      );

      return {
        auctionPublicKey: auction.pubkey,
        nftData: nftData,
        instantSalePrice:
          auctionExtended.data.instantSalePrice?.toNumber() || 0,
        state: auction.data.state,
      };
    } catch {
      console.log(
        `Marketplace NFT ${safetyDepositBoxes[0].data.tokenMint} não encontrado`
      );
    }
  }
};

export const getStoreNfts = async () => {
  validatehasSolrigamiStore();

  const auctionManagers = await programs.metaplex.AuctionManager.findMany(
    connection,
    {
      store: SOLRIGAMI_STORE,
    }
  );

  const storeNfts = (
    await Promise.all(
      auctionManagers.map((auctionManager) => getAuctionData(auctionManager))
    )
  )
    .filter(removeUndefined)
    .filter(
      (auction) => auction.state === programs.auction.AuctionState.Started
    )
    .slice(0, 20);

  return storeNfts;
};

export const getNftAuction = async (mint: StringPublicKey) => {
  const nftAuction = (await getStoreNfts()).filter(
    (nft) => nft.nftData.nft.mint === mint
  );

  return nftAuction;
};
