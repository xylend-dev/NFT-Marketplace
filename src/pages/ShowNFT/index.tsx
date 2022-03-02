import React from "react";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export default function ListNFT() {
  const { mint } = useParams<{ mint: string }>();
  return (
    <>
      <Title title="Explorar NFT" />
      <Typography>{mint}</Typography>
    </>
  );
}
