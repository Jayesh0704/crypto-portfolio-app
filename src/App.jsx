import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import WalletConnection from './features/Wallet/WalletConnection';
import CoinPage from "./components/Coin/CoinPage";
import Watchlist from './components/WatchList';
import TokenTransfer from './components/TokenTransfer'; 

import { useWalletContext } from './contexts/WalletContext'; 
import Homepage from './features/HomePage/HomePage';

function App() {
  const { walletState } = useWalletContext(); // Destructure to get the walletState

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection:'column'}}>
        
        <Routes>
          <Route path="/" element={walletState.isConnected ? <Homepage /> : <WalletConnection />} />
          <Route path="/coins/:id" element={<CoinPage/>} exact />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/token-transfer" element={<TokenTransfer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
