import React from "react";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import Title from "../../components/Title";

export default function AllowedProducts() {
  const { publicKey } = useWallet();

  return (
    <>
      <Grid container display="flex" justifyContent="space-between">
        <Title title="Criar NFT" />
        <ButtonWithTooltip
          tooltipText="Conecte-se a sua carteira digital"
          disabled={publicKey ? false : true}
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Criar NFT
        </ButtonWithTooltip>
      </Grid>
      <Grid container>
        <Grid
          container
          xs={4}
          sx={{ backgroundColor: "orange", height: "100px", width: "100%" }}
        ></Grid>
        <Grid
          container
          xs={8}
          sx={{ backgroundColor: "blue", height: "100px", width: "100%" }}
        ></Grid>
      </Grid>
    </>
  );
}
