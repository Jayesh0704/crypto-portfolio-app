// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import {
  CryptoContext,
  WalletProvider,
  AllowanceProvider,
} from "./contexts/Index"; 
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#30c0bf", // Updated primary color
    },
    mode: "dark", 
  },
  typography: {
    fontFamily: "Montserrat, sans-serif", // Ensure consistent font across the app
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CryptoContext>
        <WalletProvider>
          <AllowanceProvider>
            <CssBaseline />
            <ErrorBoundary>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </ErrorBoundary>
          </AllowanceProvider>
        </WalletProvider>
      </CryptoContext>
    </ThemeProvider>
  </React.StrictMode>
);
