import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import GradientBackground from "../../assets/img/gradient-background.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MarketplaceCard from "../../components/MarketplaceCard";
import { Info } from "@mui/icons-material";
import {
  useLastNftsCreated,
  usePopularNfts,
  useNft,
} from "../../services/hooks/nft";
import Title from "../../components/Title";
import { network } from "../../config/solanaNetwork";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

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
  const { popularNfts, error: errorPopularNfts } = usePopularNfts();
  const { lastNftsCreated, error: errorLastNftsCreated } = useLastNftsCreated();
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const scrollToMarketplace = () => marketplaceRef.current!.scrollIntoView();

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
              variant="outlined"
              size="large"
              sx={{ minWidth: "150px", marginLeft: 3 }}
              onClick={scrollToMarketplace}
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
          <MarketplaceCard
            name="Personification #179"
            likes={landingNft && landingNft.extraData?.numberLikes}
            authority={
              network === WalletAdapterNetwork.Mainnet
                ? "AswSd6Z3NnSkyVCVHhHCLNj5YSWJ7DtEAJYWmB7d98cD"
                : "EuxRDrekBF8yL7N6MophU3RFhTAyqT4Dc73ai3RspVRa"
            }
            mint={
              network === WalletAdapterNetwork.Mainnet
                ? "8hFvkUTAazTXaTrvxAK33M3zoeoRP5piWTybj5KYFAni"
                : "4AD1DK5osPcWzico65TToHXjqLZE951ZG3BsAfv8GDBk"
            }
            image="https://ipfs.io/ipfs/QmYBL7wRUn6BxEpMqRrVq7xYFFYqcCpiqoNBKs1nNVSKve"
          />
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
            A sigla NFT remete a tokens não fungíveis, ativos únicos
            digitalmente transferíveis
          </Typography>
        </Box>
        <Box
          sx={{
            padding: 1,
            margin: "auto",
          }}
        >
          <Button
            component={Link}
            to="/about"
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
      <Box ref={marketplaceRef}>
        {errorLastNftsCreated === undefined && (
          <Box sx={{ marginTop: 6 }}>
            {lastNftsCreated && lastNftsCreated.length !== 0 && (
              <Title title="Criados recentemente" />
            )}
            <Grid container spacing={3}>
              {!lastNftsCreated &&
                skeletonArray.map((_, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <MarketplaceSkeletonCard />
                  </Grid>
                ))}
              {lastNftsCreated &&
                lastNftsCreated.map((nft, index) => (
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
        {errorPopularNfts === undefined && (
          <Box sx={{ marginTop: 6 }}>
            {popularNfts && popularNfts.length !== 0 && (
              <Title title="Colecionáveis populares" />
            )}
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
      </Box>
    </Container>
  );
}
