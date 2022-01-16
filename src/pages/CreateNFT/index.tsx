import React from "react";
import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AllowedProducts() {
  const { publicKey } = useWallet();

  return (
    <>
      <Box m={2}>
        <Typography variant="h5" component="h3" gutterBottom>
          {JSON.stringify(publicKey?.toBase58())}
        </Typography>
      </Box>
    </>
  );
}
