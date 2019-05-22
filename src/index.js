import React from "react";
import { render } from "react-dom";
import Store from "context/store";
import { ThroughProvider } from "react-through";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./App";

import "./css/tailwind.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#00ff00"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  },
  typography: {
    useNextVariants: true
  }
});

render(
  <Store>
    <ThroughProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ThroughProvider>
  </Store>,
  document.getElementById("root")
);
