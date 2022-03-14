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
  name: string;
  image: string;
}

export default function MarketplaceCard(props: MarketplaceCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "350px",
        height: "auto",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          sx={{
            borderBottom: (theme) =>
              `2px solid ${theme.palette.primary.main}33`,
          }}
          image={props.image}
          alt={`NFT image - ${props.name}`}
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography noWrap gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Box
              component={Link}
              to={`/gallery/BPzbAczFfwEfpnjLVMCmnZKQQ3epjjX7KxCr9rX3fP5W`}
            >
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
                alt="Criador da arte"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  height: "28px",
                  width: "28px",
                }}
              >
                A
              </Avatar>
              <Typography noWrap variant="subtitle1" sx={{ marginLeft: 1 }}>
                Solrigami Marketplace
              </Typography>
            </Box>
            <Box display="flex">
              <Typography noWrap variant="subtitle1">
                153
              </Typography>
              <Favorite color="success" sx={{ marginLeft: 1 }} />
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
