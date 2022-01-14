import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../../config/solanaNetwork";
import {
  Metadata,
  MetadataData,
} from "@metaplex-foundation/mpl-token-metadata";

export default function ListNFT() {
  const { publicKey } = useWallet();
  const [walletNFT, setWalletNFT] = useState<Array<MetadataData>>([]);

  useEffect(() => {
    async function loadWalletNFT() {
      if (!publicKey) {
        return [];
      }
      const response = await Metadata.findDataByOwner(connection, publicKey);

      setWalletNFT(response);
    }

    loadWalletNFT();
  }, [publicKey]);

  return (
    <Container component="main">
      <Box m={2}>
        <Typography variant="h5" component="h3" gutterBottom>
          {JSON.stringify(walletNFT)}
        </Typography>
      </Box>
    </Container>
  );
}
