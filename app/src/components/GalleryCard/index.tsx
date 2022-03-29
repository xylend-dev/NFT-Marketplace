import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export interface NftGalleryCardProps {
  mint: string;
  image: string;
  name: string;
  description: string;
  isNftListed: boolean;
}

const abbreviateText = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }

  return text;
};

export default function GalleryCard(props: NftGalleryCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box style={isImageLoaded ? { display: "none" } : {}}>
          <Skeleton
            variant="rectangular"
            width="100%" height={260}
          />
        </Box>
        <CardMedia
          style={isImageLoaded ? {} : { display: "none" }}
          component="img"
          height="260"
          onLoad={() => setIsImageLoaded(true)}
          image={props.image}
          alt={`NFT image - ${props.name}`}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {abbreviateText(props.description, 100)}
          </Typography>
        </CardContent>
      </Box>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          component={Link}
          to={`/gallery/${props.mint}`}
          startIcon={<InfoIcon />}
        >
          Detalhes
        </Button>
        <Button disabled startIcon={<SellIcon />}>
          Vender
        </Button>
      </CardActions>
    </Card>
  );
}
