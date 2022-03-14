import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import GradientBackground from "../../assets/img/gradient-background.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MarketplaceCard from "../../components/MarketplaceCard";

export default function Marketplace() {
  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
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
          Marketplace de tokens não fungíveis (NFTs). Crie, compre e venda artes
          digitais únicas na blockchain Solana.
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
            sm: 0,
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
  );
}
