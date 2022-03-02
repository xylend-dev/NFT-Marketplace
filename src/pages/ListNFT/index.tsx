import React from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNftList } from "../../services/hooks/nft";
import GalleryCard from "../../components/GalleryCard";
import NotFoundNFT from "../NotFoundNFT";
import WalletNotConnected from "../WalletNotConnected";

export default function ListNFT() {
  const { publicKey } = useWallet();
  const data = useWalletNftList(publicKey);
  const skeletonArray = Array(4).fill("");

  if (!publicKey) {
    return <WalletNotConnected />;
  }

  return (
    <>
      {publicKey && data?.length === 0 && <NotFoundNFT />}
      {publicKey && data?.length !== 0 && (
        <>
          <Typography
            color="primary"
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              fontWeight: "500",
              marginBottom: (theme) => theme.spacing(4),
            }}
          >
            Meus Colecionáveis
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={3}>
              {!data &&
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
              {data &&
                data.map((nft, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <GalleryCard
                      mint={`8Vujaia92NYTcm62T2JZ17LmraAFHuevuJvTkPmNWwb8`}
                      image={nft.image}
                      name={nft.name}
                      description={nft.description}
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
