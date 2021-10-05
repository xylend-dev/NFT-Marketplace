import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useStyles } from "./styles";

export default function AllowedProducts() {
  const classes = useStyles();

  return (
    <Container component="main">
      <Box m={2} className={classes.example}>
        <Typography variant="h5" component="h3" gutterBottom>
          Criar NFT
        </Typography>
      </Box>
    </Container>
  );
}
