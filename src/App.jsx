import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 import Header from './components/Header/Header';
import WalletConnection from './features/Wallet/WalletConnection';
import Dashboard from './features/dashboard/Dashboard';

import { useWalletContext } from './contexts/WalletContext'; // Import the custom wallet context hook
import Homepage from './features/HomePage/HomePage';

function App() {
  const { walletState } = useWalletContext(); // Destructure to get the walletState

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection:'column'}}>
        <Header />
        <Routes>
          <Route path="/" element={walletState.isConnected ? <Homepage /> : <WalletConnection />} />
          {/* Removed exact as it's not needed in React Router v6 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
