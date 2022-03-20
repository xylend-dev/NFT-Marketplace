import Nft from "../models/Nft";

export const getNftService = async (mint: string) => {
  const nft = await Nft.findOne({ mint: mint }).exec();
  const numberLikes = (nft && nft.likeWallet.length) || 0;

  return {
    mint: mint,
    numberLikes: numberLikes,
  };
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
