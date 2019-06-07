import React from "react";
import { render } from "react-dom";
import Store from "context/store";
import { ThroughProvider } from "react-through";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { COLORS } from "./modules/styles";
import AppWrapper from "./AppWrapper";
import { AppProvider } from "./context/appContext";

import "./css/tailwind.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: COLORS.OIVA_GREEN
      // dark: will be calculated from palette.primary.main,
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: COLORS.DARK_GRAY
      // dark: will be calculated from palette.secondary.main,
      // contrastText: will be calculated to contrast with palette.secondary.main
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
        <AppProvider>
          <AppWrapper />
        </AppProvider>
      </MuiThemeProvider>
    </ThroughProvider>
  </Store>,
  document.getElementById("root")
);
