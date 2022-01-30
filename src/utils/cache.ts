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
    createdNfts = JSON.parse(createdNftsRaw);
  }

  if (!(mint in createdNfts)) {
    createdNfts[mint] = {
      mint,
      arweaveUri,
    };
  }

  createdNftsRaw = JSON.stringify(createdNfts);
  localStorage.setItem(CREATED_NFT_KEY, createdNftsRaw);
}
