import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar/SideBar';
import WalletConnection from './features/Wallet/WalletConnection';
import Dashboard from './features/dashboard/Dashboard';
import { useWalletContext } from './contexts/WalletContext'; // Import the custom wallet context hook

function App() {
  const { walletState } = useWalletContext(); // Destructure to get the walletState

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Routes>
          <Route path="/" element={walletState.isConnected ? <Dashboard /> : <WalletConnection />} />
          {/* Removed exact as it's not needed in React Router v6 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
