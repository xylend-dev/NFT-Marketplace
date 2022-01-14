import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useLocation } from "react-router-dom";
import LogoImage from "../../assets/img/logo.svg";
import { WalletMultiButton } from "../../utils/wallet/WalletMultiButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Navbar() {
  const navbarMinimumHeight = 64;
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            value={location.pathname}
            aria-label="nav tabs example"
            sx={{
              minHeight: navbarMinimumHeight,
              display: "flex",
              alignItems: "center",
              "& .MuiTabs-indicator": {
                height: 6,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
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
          <Box sx={{ flexGrow: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Procurar arte"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <WalletMultiButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
