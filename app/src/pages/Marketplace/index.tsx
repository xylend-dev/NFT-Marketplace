import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import GradientBackground from "../../assets/img/gradient-background.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MarketplaceCard from "../../components/MarketplaceCard";
import { Info } from "@mui/icons-material";
import {
  useLastNftCreated,
  usePopularNfts,
  useNft,
} from "../../services/hooks/nft";
import Title from "../../components/Title";

function MarketplaceSkeletonCard() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        height="350px"
        width="100%                                                                                                                                        "
      />
      <Skeleton
        variant="rectangular"
        height="30px"
        width="100%"
        sx={{ marginTop: "8px" }}
      />
      <Skeleton
        variant="rectangular"
        height="30px"
        width="100%"
        sx={{ marginTop: "8px" }}
      />
    </Box>
  );
}

export default function Marketplace() {
  const { data: landingNft } = useNft(
    "8hFvkUTAazTXaTrvxAK33M3zoeoRP5piWTybj5KYFAni"
  );
  const lastCreatedNft = useLastNftCreated();
  const { popularNfts, error: errorPopularNfts } = usePopularNfts();
  const skeletonArray = Array(4).fill("");

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        overflowX: "hidden",
        padding: (theme) => `${theme.spacing(5)} !important`,
      }}
    >
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ maxWidth: "500px !important", margin: "auto" }}
        >
          <Typography variant="h2" sx={{ fontWeight: "medium" }}>
            Colecione, crie e venda{" "}
            <Box
              display="inline"
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              NFTs
            </Box>
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 6 }}>
            Marketplace de tokens não fungíveis (NFTs). Crie, compre e venda
            artes digitais únicas na blockchain Solana.
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/create"
              variant="contained"
              size="large"
              endIcon={<ChevronRightIcon />}
              sx={{ minWidth: "150px" }}
            >
              Criar NFT
            </Button>
            <Button
              href="#created"
              variant="outlined"
              size="large"
              sx={{ minWidth: "150px", marginLeft: 3 }}
            >
              Explorar
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          sx={{
            paddingTop: {
              xs: 6,
              md: 0,
            },
            backgroundPosition: "left top, right bottom",
            backgroundSize: "90%, 90%",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundImage: `url(${GradientBackground}), url(${GradientBackground})`,
          }}
        >
          {landingNft === undefined && <MarketplaceSkeletonCard />}
          {landingNft && (
            <MarketplaceCard
              name={landingNft.metadata.name}
              likes={landingNft.extraData?.numberLikes}
              authority={landingNft.nft.updateAuthority}
              mint={landingNft.nft.mint}
              image={landingNft.metadata.image}
            />
          )}
        </Grid>
      </Grid>
      <Box
        display="flex"
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          marginTop: 6,
          padding: 4,
          backgroundColor: "#023047",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center" sx={{ padding: 1 }}>
          <Info />
          <Typography variant="h5" sx={{ marginLeft: 4 }}>
            Um NFT é uma representação única de um ativo em meio digital que
            possibilita a propriedade, a rastreabilidade e a comerciabilidade
            através do uso da tecnologia Blockchain.
          </Typography>
        </Box>
        <Box
          sx={{
            padding: 1,
            margin: "auto",
          }}
        >
          <Button
            size="large"
            endIcon={<ChevronRightIcon />}
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: "white",
              minWidth: "150px",
              width: "150px",
            }}
          >
            Saiba mais
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: 6 }} id="created">
        <Title title="Criados recentemente" />
        <Grid container spacing={3}>
          {!lastCreatedNft &&
            skeletonArray.map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <MarketplaceSkeletonCard />
              </Grid>
            ))}
          {lastCreatedNft &&
            lastCreatedNft.map((nft, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <MarketplaceCard
                  name={nft.metadata.name}
                  likes={nft.extraData?.numberLikes}
                  authority={nft.nft.updateAuthority}
                  mint={nft.nft.mint}
                  image={nft.metadata.image}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      {errorPopularNfts === undefined && (
        <Box sx={{ marginTop: 6 }}>
          <Title title="Colecionáveis populares" />
          <Grid container spacing={3}>
            {!popularNfts &&
              skeletonArray.map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <MarketplaceSkeletonCard />
                </Grid>
              ))}
            {popularNfts &&
              popularNfts.map((nft, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <MarketplaceCard
                    name={nft.metadata.name}
                    likes={nft.extraData?.numberLikes}
                    authority={nft.nft.updateAuthority}
                    mint={nft.nft.mint}
                    image={nft.metadata.image}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <Box sx={{ marginTop: 6 }}>
        <Title title="Listados recentemente" />
        <Grid container spacing={3}>
          {!lastCreatedNft &&
            skeletonArray.map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <MarketplaceSkeletonCard />
              </Grid>
            ))}
          {lastCreatedNft &&
            lastCreatedNft.map((nft, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <MarketplaceCard
                  name={nft.metadata.name}
                  likes={nft.extraData?.numberLikes}
                  authority={nft.nft.updateAuthority}
                  mint={nft.nft.mint}
                  image={nft.metadata.image}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
