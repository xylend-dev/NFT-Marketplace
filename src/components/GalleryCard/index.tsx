import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BlockIcon from "@mui/icons-material/Block";
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import { NftGalleryCardProps } from "./interface";

export default function GalleryCard(props: NftGalleryCardProps) {
  return (
    <Card sx={{ minHeight: 380}}>
      <CardMedia
        component="img"
        height="250"
        image={props.image}
        alt={`NFT image - ${props.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled startIcon={<InfoIcon />}>Detalhes</Button>
        {!props.isNftListed && <Button disabled startIcon={<SellIcon />}>Vender</Button>}
        {props.isNftListed && (
          <Button disabled startIcon={<BlockIcon />}>Parar venda</Button>
        )}
      </CardActions>
    </Card>
  );
}
