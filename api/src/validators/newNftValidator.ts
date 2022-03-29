import { checkSchema } from "express-validator";

export const postNewNftValidator = checkSchema({
  mint: {
    in: ["body"],
    isString: true,
    errorMessage: "Mint de NFT é um campo obrigatório",
    trim: true,
  },
});
