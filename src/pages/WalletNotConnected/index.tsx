import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import wallet from "../../assets/animation/wallet.json";

export default function WalletNotConnected() {
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
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: (theme) => theme.spacing(3),
      }}
    >
      <Lottie
        options={{
          ...defaultAnimationOptions,
          animationData: wallet,
        }}
        height={300}
        width={300}
      />
      <Typography
        color="primary"
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          maxWidth: "500px",
          marginTop: (theme) => theme.spacing(4),
        }}
      >
        Conecte-se a sua carteira digital para visualizar os seus NFTs
      </Typography>
      <Button
        component={Link}
        to="/about"
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
        startIcon={<InfoIcon />}
        variant="contained"
      >
        O que é carteira digital?
      </Button>
    </Box>
  );
}
