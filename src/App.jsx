import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import SideBar from './components/Sidebar/SideBar'
import WalletConnection from './features/Wallet/WalletConnection';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  const isWalletConnected = useSelector(state => state.wallet.isConnected);

  return (
    <Router>
     
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Routes>
          <Route path="/" element={isWalletConnected ? <Dashboard /> : <WalletConnection />} exact />
          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;