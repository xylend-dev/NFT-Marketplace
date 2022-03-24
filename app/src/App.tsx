import React, { useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { WalletDialogProvider } from "./utils/wallet/WalletDialogProvider";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { network, endpoint } from "./config/solanaNetwork";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { light: "#FFB703", main: "#FB8500", contrastText: "#FFFFFF" },
    secondary: { main: "#58E997" },
    success: { main: "#4BB543" },
    error: { main: "#E10050" },
  },
});

export default function App() {
  const location = useLocation();

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
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <SnackbarProvider>
              <CssBaseline />
              <Navbar />
              <Routes />
              {(location.pathname === "/" || location.pathname === "/about") && (
                <Footer />
              )}
            </SnackbarProvider>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
