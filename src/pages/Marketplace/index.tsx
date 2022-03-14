import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import GradientBackground from "../../assets/img/gradient-background.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MarketplaceCard from "../../components/MarketplaceCard";
import { Info } from "@mui/icons-material";

export default function Marketplace() {
  return (
    <>
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
            name="Nome da arte #01"
            // image="https://arweave.net/zUbm91h7mvX-thD1J-V0h-4TXRLHtnDkCdiw-7aKQSs"
            image="https://arweave.net/avj0ZtqaH2lq6wbYakxXgpeEbWvogN-_jbwAaBn10pU"
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
    </>
  );
}
