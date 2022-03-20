import { getWalletBalance } from "../services/solanaService";

export const validateWalletBalance = async (walletAddress: string) => {
  let walletBalance = 0;
  if (walletAddress) {
    walletBalance = await getWalletBalance(walletAddress);
  }

  if (walletBalance < 10000000) {
    throw new Error(
      "Carteiras com saldo inferior a 0,01 SOL não podem curtir NFT"
    );
  }
};
