import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import Routes from "./routes";

const theme = createTheme({
  palette: {
    primary: { light: "#FFB703", main: "#FB8500", contrastText: "#FFFFFF" },
    secondary: { main: "#58E997" },
    success: { main: "#4BB543" },
    error: { main: "#E10050" },
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
