import { getMintSupply } from "../services/solanaService";

export const validateMintSupply = async (mint: string) => {
  const mintSupply = await getMintSupply(mint);

  if (mintSupply <= 0) {
    throw new Error("Não foi possível encontrar o token informado");
  }
};
