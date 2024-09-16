

 import Sidebar from './components/Sidebar/SideBar';
import WalletConnection from './components/WalletConnection';
import React from 'react';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Container component="main" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Connect to Wallet
        </Typography>
        <WalletConnection />
      </Container>
    </Box>
  );
}

export default App;





