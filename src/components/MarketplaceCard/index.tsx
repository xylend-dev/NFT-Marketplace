import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Favorite } from "@mui/icons-material";

export interface MarketplaceCardProps {
  mint: string;
  name: string;
  image: string;
  authority: string;
  likes?: number;
}

export default function MarketplaceCard(props: MarketplaceCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        textDecoration: "none",
      }}
      component={Link}
      to={`/gallery/${props.mint}`}
    >
      <Box>
        <CardMedia
          component="img"
          height="350"
          image={props.image}
          alt={`NFT image - ${props.name}`}
          sx={{
            objectFit: "contain",
            backgroundColor: (theme) => `${theme.palette.primary.main}22`,
            borderBottom: (theme) =>
              `2px solid ${theme.palette.primary.main}33`,
          }}
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography noWrap gutterBottom variant="h5">
              {props.name}
            </Typography>
            <Box component={Link} to={`/gallery/${props.mint}`}>
              <InfoIcon sx={{ color: "#023047" }} />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              marginTop: 1,
            }}
          >
            <Box display="flex">
              <Avatar
                alt={`Dono do NFT - ${props.authority}`}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  height: "28px",
                  width: "28px",
                }}
              >
                {props.authority.length > 0 ? props.authority[0] : "."}
              </Avatar>
              <Typography noWrap variant="subtitle1" sx={{ marginLeft: 1 }}>
                {props.authority.substring(0, 20) + "..."}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography noWrap variant="subtitle1">
                {props.likes || 0}
              </Typography>
              <Favorite color="success" sx={{ marginLeft: 1 }} />
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
