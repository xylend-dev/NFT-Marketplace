import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export interface AboutNFTCardProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function AboutNFTCard(props: AboutNFTCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "350px",
      }}
    >
      <CardContent>
        <img height="64px" width="64px" src={props.icon} alt={props.alt} />
        <Typography
          color="primary"
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
        <Typography variant="body1">{props.description}</Typography>
      </CardContent>
    </Card>
  );
}
