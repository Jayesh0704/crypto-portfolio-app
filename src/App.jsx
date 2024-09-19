import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 import Header from './components/Header/Header';
import WalletConnection from './features/Wallet/WalletConnection';
import CoinPage from "./components/Coin/CoinPage";

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
          <Route path="/coins/:id" element={<CoinPage/>} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
