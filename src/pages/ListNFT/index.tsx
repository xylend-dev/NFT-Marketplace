import React from "react";
import { Box, Button, Grid, Skeleton } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNftList } from "../../services/hooks/nft";
import GalleryCard from "../../components/GalleryCard";
import NotFoundNFT from "../NotFoundNFT";
import WalletNotConnected from "../WalletNotConnected";
import Title from "../../components/Title";

export default function ListNFT() {
  const { publicKey } = useWallet();
  const nfts = useWalletNftList(publicKey);
  const skeletonArray = Array(4).fill("");

  if (!publicKey) {
    return <WalletNotConnected />;
  }

  return (
    <>
      {publicKey && nfts?.length === 0 && (
        <NotFoundNFT message="Nenhum NFT encontrado para esta carteira" />
      )}
      {publicKey && nfts?.length !== 0 && (
        <>
          <Title title="Meus colecionáveis" />
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={3}>
              {!nfts &&
                skeletonArray.map((_, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={250}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30}
                        sx={{ marginTop: (theme) => theme.spacing(2) }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={50}
                        sx={{ marginTop: (theme) => theme.spacing(1) }}
                      />
                      <Box display="flex" justifyContent="space-between">
                        <Skeleton width="45%" height={50}>
                          <Button />
                        </Skeleton>
                        <Skeleton width="45%" height={50}>
                          <Button />
                        </Skeleton>
                      </Box>
                    </>
                  </Grid>
                ))}
              {nfts &&
                nfts.map((nft, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <GalleryCard
                      mint={nft.mint}
                      image={nft.metadata.image}
                      name={nft.metadata.name}
                      description={nft.metadata.description}
                      isNftListed={index % 2 === 0}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
