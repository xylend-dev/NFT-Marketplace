import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import nftCardsAnimation from "../../assets/animation/nftCards.json";
import searchNotFoundAnimation from "../../assets/animation/searchNotFound.json";

export default function NotFoundNFT() {
  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
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
  );
}
