const CREATED_NFT_KEY = "nft:created";

export interface createdNftProps {
  arweaveUri: string;
  mint: string;
}

export interface cacheCreatedNftProps {
  [mint: string]: createdNftProps;
}

export function cacheCreatedNft(arweaveUri: string, mint: string) {
  let createdNftsRaw = localStorage.getItem(CREATED_NFT_KEY);
  let createdNfts: cacheCreatedNftProps = {};
  if (createdNftsRaw) {
    try {
      createdNfts = JSON.parse(createdNftsRaw);
    } catch (e) {
      console.log("Unexpected error while trying to parse created NFTs");
      return;
    }
  }

  if (!(mint in createdNfts)) {
    createdNfts[mint] = {
      mint,
      arweaveUri,
    };
  }

  console.log("Minted NFT data: ", createdNfts[mint]);
  try {
    createdNftsRaw = JSON.stringify(createdNfts);
    localStorage.setItem(CREATED_NFT_KEY, createdNftsRaw);
  } catch (e) {
    console.log("Missing storage to cache the metadata of the created NFT");
    return;
  }
}
