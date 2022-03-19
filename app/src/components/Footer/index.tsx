import React from "react";
import { Box, Link, Typography } from "@mui/material";
import FooterBackground from "../../assets/img/footer.svg";
import WhiteLogo from "../../assets/img/white-logo.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "relative",
        marginTop: "20vh",
        backgroundSize: "cover",
        width: "100%",
        height: "50vh",
        backgroundImage: `url(${FooterBackground})`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "8vh",
          left: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img
            src={WhiteLogo}
            height="48px"
            width="48px"
            alt="Logo da aplicação Solrigami"
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            color="white"
            sx={{ marginLeft: 2, textTransform: "uppercase" }}
          >
            Solrigami
          </Typography>
        </Box>
        <Typography
          component={Link}
          href="https://github.com/solrigami/app"
          variant="h6"
          color="white"
          sx={{ marginTop: 1, textDecoration: "none" }}
        >
          Contribua com a aplicação Solrigami no GitHub
        </Typography>
      </Box>
    </Box>
  );
}
