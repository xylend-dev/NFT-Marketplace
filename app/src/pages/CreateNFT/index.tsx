import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AllowedProducts() {
  const { publicKey } = useWallet();

  return (
    <Container component="main">
      <Box m={2}>
        <Typography variant="h5" component="h3" gutterBottom>
          {JSON.stringify(publicKey?.toBase58())}
        </Typography>
      </Box>
    </Container>
  );
}
