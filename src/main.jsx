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
} from "./features/AllowanceCheck/Index"; // Ensure correct imports
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // Example color
    },
    mode: "dark", // for dark mode you can define additional properties as needed
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CryptoContext>
        <WalletProvider>
          <AllowanceProvider>
            {" "}
            {/* Correctly wrap AllowanceProvider */}
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
