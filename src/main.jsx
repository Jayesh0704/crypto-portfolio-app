import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { CurrencyProvider, WalletProvider } from './contexts/Index';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <CurrencyProvider>
      <WalletProvider>
        
          <CssBaseline />
          <App />
       
      </WalletProvider>
    </CurrencyProvider>
  </React.StrictMode>,
);
