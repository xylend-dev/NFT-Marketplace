import React from "react";
import { Button, Icon, Link } from "@mui/material";

export interface LinkButtonProps {
  href?: string;
  text: string;
  icon: string;
  alt: string;
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Button
      component={Link}
      disabled={props.href ? false : true}
      href={props.href}
      target="_blank"
      rel="noreferrer noopener"
      startIcon={
        <Icon>
          <img height={20} width={20} alt={props.alt} src={props.icon} />
        </Icon>
      }
      variant="outlined"
      fullWidth
      sx={{
        textAlign: "center",
      }}
    >
      {props.text}
    </Button>
  );
}
