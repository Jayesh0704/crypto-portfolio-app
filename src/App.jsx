

//  import Sidebar from './components/Sidebar/SideBar';
// import WalletConnection from './components/WalletConnection';
// import React from 'react';
// import { CssBaseline, Container, Box, Typography } from '@mui/material';
// function App() {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <Sidebar />
//       <Container component="main" sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Connect to Wallet
//         </Typography>
//         <WalletConnection />
//       </Container>
//     </Box>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/SideBar';
import WalletConnection from './features/Wallet/WalletConnection';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  const isWalletConnected = useSelector(state => state.wallet.isConnected);

  return (
    <Router>
     
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={isWalletConnected ? <Dashboard /> : <WalletConnection />} exact />
          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;






