// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { CryptoContext, WalletProvider } from './contexts/Index';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // Example color
    },
    mode: 'dark', // for dark mode you can define additional properties as needed
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ThemeProvider  theme={theme}>
    <CryptoContext>
      <WalletProvider>
        <CssBaseline />
        <App />
      </WalletProvider>
    </CryptoContext>

    </ThemeProvider>
  </React.StrictMode>,
);
