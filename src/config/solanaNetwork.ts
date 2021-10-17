import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const environment = process.env.REACT_APP_ENV;

let network = WalletAdapterNetwork.Devnet;
if (environment === "production") {
  network = WalletAdapterNetwork.Mainnet;
}
const endpoint = clusterApiUrl(network);

export { network, endpoint };
