import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import LogoImage from "../../assets/img/logo.svg";
import { WalletMultiButton } from "../../utils/wallet/WalletMultiButton";

export default function Navbar() {
  const navbarMinimumHeight = 64;
  const location = useLocation();
  let currentTab = "/" + location.pathname.split("/")[1];
  if (!["/", "/create", "/gallery", "/about"].includes(currentTab)) {
    currentTab = "/";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: (theme) =>
            `${theme.palette.primary.light}33 0px 1px 3px, ${theme.palette.primary.light}33 0px 1px 2px`,
        }}
      >
        <Toolbar sx={{ backgroundColor: "white" }}>
          <Button
            disableFocusRipple
            component={Link}
            to="/"
            disableRipple
            sx={{ minHeight: navbarMinimumHeight }}
          >
            <img
              height="48px"
              width="48px"
              src={LogoImage}
              alt="Solrigami logo"
            />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "primary.main",
                margin: (theme) =>
                  `0 ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
              }}
            >
              Solrigami
            </Typography>
          </Button>
          <Tabs
            value={currentTab}
            aria-label={`Navigation tab (${currentTab})`}
            sx={{
              minHeight: navbarMinimumHeight,
              display: "flex",
              alignItems: "center",
              "& .MuiTabs-indicator": {
                height: 6,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
              flexGrow: 1,
            }}
          >
            <Tab
              component={NavLink}
              value="/"
              to="/"
              exact
              label="Marketplace"
              sx={{
                minHeight: navbarMinimumHeight,
              }}
            />
            <Tab
              component={NavLink}
              value="/create"
              to="/create"
              exact
              label="Criar NFT"
              sx={{
                minHeight: navbarMinimumHeight,
              }}
            />
            <Tab
              component={NavLink}
              value="/gallery"
              to="/gallery"
              exact
              label="Galeria"
              sx={{
                minHeight: navbarMinimumHeight,
              }}
            />
            <Tab
              component={NavLink}
              value="/about"
              exact
              label="Sobre"
              to="/about"
              sx={{
                minHeight: navbarMinimumHeight,
              }}
            />
          </Tabs>
          <WalletMultiButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
