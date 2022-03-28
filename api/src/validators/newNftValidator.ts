import { checkSchema } from "express-validator";
import { validateMintSupply } from "./solanaValidator";

export const postNewNftValidator = checkSchema({
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
});
