import * as React from "react";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';

import Layout from './components/Layout'

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
 
});

function App() {
  return (
    <div>
      <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
