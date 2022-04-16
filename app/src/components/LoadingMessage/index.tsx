import React from "react";
import { Box, Typography } from "@mui/material";
import { defaultAnimationOptions } from "../../utils/lottie";
import LoadingAnimation from "../../assets/animation/loading.json";
import Lottie from "react-lottie";

export interface LoadingMessageProps {
  messages: Array<string>;
}

export default function LoadingMessage(props: LoadingMessageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        marginTop: "10vh",
      }}
    >
      <Lottie
        options={{
          ...defaultAnimationOptions,
          animationData: LoadingAnimation,
        }}
        height={200}
        width={200}
      />
      <Typography
        color="primary"
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          maxWidth: "800px",
        }}
      >
        {props.messages.map((message) => (
          <Box>{message}</Box>
        ))}
      </Typography>
    </Box>
  );
}
