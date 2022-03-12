import React from "react";
import { Box, Link, Typography } from "@mui/material";
import FooterBackground from "../../assets/img/footer.svg";
import WhiteLogo from "../../assets/img/white-logo.svg";

export default function Marketplace() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundSize: "cover",
        width: "100vw",
        height: "50vh",
        backgroundImage: `url(${FooterBackground})`,
      }}
    >
      {/* <img
        style={{ position: "absolute", bottom: 0, objectFit: 'cover' }}
        width="100%"
        height="auto"
        src={FooterBackground}
        alt="Rodapé da aplicação Solrigami"
      /> */}
      <Box sx={{ position: "absolute", bottom: "5vh", left: "5vw" }}>
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
            sx={{
              marginLeft: 2,
              textTransform: "uppercase",
            }}
          >
            Solrigami
          </Typography>
        </Box>
        <Typography
          component={Link}
          href="https://github.com/solrigami/app"
          variant="h6"
          color="white"
          sx={{
            marginTop: 1,
            textDecoration: "none",
          }}
        >
          Contribua com a aplicação Solrigami no GitHub
        </Typography>
      </Box>
    </Box>
  );
}
