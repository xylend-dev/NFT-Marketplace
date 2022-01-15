import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNftList } from "../../services/hooks/nft";

export default function ListNFT() {
  const { publicKey } = useWallet();
  const data = useWalletNftList(publicKey);

  if (!publicKey) {
    return (
      <Container component="main">
        <Box m={2}>
          <Typography variant="h5" component="h3" gutterBottom>
            Connect wallet
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main">
      <Box m={2}>
        <Typography variant="h5" component="h3" gutterBottom>
          {data && JSON.stringify(data[0].name)}
        </Typography>
      </Box>
    </Container>
  );
}
