import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';
import Button from "@material-ui/core/Button";

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
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
