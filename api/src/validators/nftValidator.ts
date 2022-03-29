import { checkSchema } from "express-validator";
import Nft from "../models/Nft";
import { validateMintSupply } from "./solanaValidator";

export const validateNftLike = async (mint: string, walletAddress: string) => {
  const nft = await Nft.findOne({
    mint: mint,
    likeWallet: walletAddress,
  }).exec();

  if (nft) {
    throw new Error("Curtida já computada no NFT");
  }
};

export const postNftLikeValidator = checkSchema({
  mint: {
    in: ["body"],
    isString: true,
    errorMessage: "Mint de NFT é um campo obrigatório",
    trim: true,
    custom: {
      options: async (value: string) => {
        await validateMintSupply(value);
      },
    },
  },
  walletAddress: {
    in: ["body"],
    isString: true,
    errorMessage: "Endereço de carteira de criptoativos é obrigatório",
    trim: true,
    custom: {
      options: async (value: string, { req }) => {
        await validateNftLike(req.body.mint, value);
      },
    },
  },
});
