import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import DrawerAppBar from "./App";
import reportWebVitals from "./reportWebVitals";
import { blue, yellow } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
  typography: {
    h1: {
      fontSize: "2.4rem",
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
    },
    h3: {
      fontSize: "1.6rem",
      marginBottom: "1rem",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <DrawerAppBar />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
