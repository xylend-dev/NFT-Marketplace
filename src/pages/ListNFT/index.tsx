import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNftList } from "../../services/hooks/nft";
import GalleryCard from "../../components/GalleryCard";
import nftCardsAnimation from "../../assets/animation/nftCards.json";
import searchNotFoundAnimation from "../../assets/animation/searchNotFound.json";

export default function ListNFT() {
  const { publicKey } = useWallet();
  const data = useWalletNftList(publicKey);
  const skeletonArray = Array(4).fill("");
  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!publicKey) {
    return (
      <Container
        component="main"
        maxWidth="xl"
        sx={{ padding: (theme) => `${theme.spacing(5)} !important` }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute" }}>
              <Lottie
                options={{
                  ...defaultAnimationOptions,
                  animationData: nftCardsAnimation,
                }}
                height={400}
                width={400}
              />
            </Box>
            <Box sx={{ position: "absolute", left: "-150px", top: "60px" }}>
              <Lottie
                options={{
                  ...defaultAnimationOptions,
                  animationData: searchNotFoundAnimation,
                }}
                height={400}
                width={300}
              />
            </Box>
          </Box>
          <Typography
            color="primary"
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              maxWidth: "600px",
              marginTop: "370px",
            }}
          >
            Nenhum NFT encontrado para esta carteira
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              width: "100%",
              maxWidth: "350px",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Button
              component={Link}
              to="/create"
              sx={{
                maxWidth: "160px",
                width: "100%",
                marginTop: (theme) => theme.spacing(2),
              }}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Criar NFT
            </Button>
            <Button
              component={Link}
              to="/"
              sx={{
                maxWidth: "160px",
                width: "100%",
                marginTop: (theme) => theme.spacing(2),
              }}
              startIcon={<ShoppingCartIcon />}
              variant="contained"
            >
              Comprar NFT
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ padding: (theme) => `${theme.spacing(5)} !important` }}
    >
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
                  <Skeleton variant="rectangular" width="100%" height={250} />
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
              <Grid key={nft.name} item xs={12} sm={6} md={4} lg={3}>
                <GalleryCard
                  image={nft.image}
                  name={nft.name}
                  description={nft.description}
                  isNftListed={index % 2 === 0}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
