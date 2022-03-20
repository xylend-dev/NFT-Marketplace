import React from "react";
import { Typography } from "@mui/material";

export interface TitleProps {
  title: string;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      color="primary"
      variant="h4"
      component="h2"
      gutterBottom
      sx={{
        textTransform: "uppercase",
        fontWeight: "500",
        marginBottom: (theme) => theme.spacing(4),
      }}
    >
      {props.title}
    </Typography>
  );
}
