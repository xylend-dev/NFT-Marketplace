import Nft from "../models/Nft";

export const getNftService = async (mint: string) => {
  const nft = Nft.find({ mint });
  return nft;
};

export const postNftLikeService = async (
  mint: string,
  walletAddress: string
) => {
  const nft = await Nft.findOneAndUpdate(
    { mint },
    { $addToSet: { likeWallet: walletAddress } },
    { upsert: true, returnDocument: "after" }
  ).exec();

  return nft;
};
