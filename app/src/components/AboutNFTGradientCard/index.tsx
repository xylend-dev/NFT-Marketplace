import React from "react";
import { Card, CardContent, Link, Typography } from "@mui/material";

export interface AboutNFTCardProps {
  href: string;
  image: string;
  alt: string;
  title: string;
  description: string;
}

export default function AboutNFTGradientCard(props: AboutNFTCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "500px",
        backgroundSize: "100% 150px, cover",
        backgroundPosition: "bottom, center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundImage: `linear-gradient(#FB850000, #FB8500), url(${props.image})`,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          textDecoration: "none",
        }}
        component={Link}
        href={props.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Typography
          color="white"
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            marginTop: 1,
            marginBottom: 2,
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          {props.title}
        </Typography>
        <Typography color="white" variant="body1">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
