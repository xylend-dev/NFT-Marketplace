import { getWalletBalance, getMintSupply } from "../services/solanaService";

export const validateWalletBalance = async (walletAddress: string) => {
  let walletBalance = 0;
  if (walletAddress) {
    walletBalance = await getWalletBalance(walletAddress);
  }

  if (walletBalance < 10000000) {
    throw new Error(
      "Carteira com saldo inferior a 0,01 SOL não pode realizar essa operação"
    );
  }
};

export const validateMintSupply = async (mint: string) => {
  const mintSupply = await getMintSupply(mint);

  if (mintSupply <= 0) {
    throw new Error("Não foi possível encontrar o token informado");
  }
};
