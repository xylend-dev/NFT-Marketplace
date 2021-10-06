import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { WalletDialogProvider } from "./wallet/WalletDialogProvider";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { clusterApiUrl } from "@solana/web3.js";

const theme = createTheme({
  palette: {
    primary: { light: "#FFB703", main: "#FB8500", contrastText: "#FFFFFF" },
    secondary: { main: "#58E997" },
    success: { main: "#4BB543" },
    error: { main: "#E10050" },
  },
});

export default function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <CssBaseline />
            <Navbar />
            <Routes />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
