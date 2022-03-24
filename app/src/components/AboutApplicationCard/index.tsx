import React from "react";
import { Box, Button, Link, Typography } from "@mui/material";

export interface AboutApplicationCardProps {
  href: string;
  buttonLabel: string;
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export default function AboutApplicationCard(props: AboutApplicationCardProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "100%", maxWidth: "300px" }}
    >
      <img height="64px" width="64px" src={props.icon} alt={props.alt} />
      <Typography
        color="white"
        variant="h5"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{
          marginTop: 3,
          marginBottom: 6,
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        {props.title}
      </Typography>
      <Typography variant="body1" textAlign="center" color="white">
        {props.description}
      </Typography>
      <Button
        component={Link}
        href={props.href}
        target="_blank"
        rel="noreferrer noopener"
        variant="contained"
        sx={{
          width: "150px",
          marginTop: 8,
        }}
      >
        {props.buttonLabel}
      </Button>
    </Box>
  );
}
