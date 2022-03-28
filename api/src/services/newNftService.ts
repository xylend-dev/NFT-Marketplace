import NewNft from "../models/NewNft";

export const getNewNftService = async (limit: number) => {
  const newCreatedNfts = await NewNft.aggregate([
    {
      $project: {
        _id: 0,
        createdAt: 1,
        mint: 1,
      },
    },
  ])
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec();

  return newCreatedNfts;
};

export const postNewNftService = async (mint: string) => {
  const nft = await NewNft.findOneAndUpdate(
    { mint },
    {},
    {
      upsert: true,
      returnDocument: "after",
    }
  ).exec();

  return nft;
};
