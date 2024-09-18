import React, { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletState, setWalletState] = useState({
    address: '',
    balance: 0,
    profitLoss: 0,
    isConnected: false,
  });

  const connectWallet = useCallback(async (address, balance, profitLoss) => {
    setWalletState({
      address,
      balance,
      profitLoss,
      isConnected: true,
    });
  }, []);

  const removeWallet = useCallback(() => {
    setWalletState({
      address: '',
      balance: 0,
      profitLoss: 0,
      isConnected: false,
    });
  }, []);

  const fetchWalletDetails = useCallback(async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      
      // You might want to calculate profitLoss here or fetch it from somewhere
      const profitLoss = 0; 

      connectWallet(address, formattedBalance, profitLoss);
    } catch (error) {
      console.error('Error fetching wallet details:', error);
    }
  }, [connectWallet]);

  return (
    <WalletContext.Provider value={{ walletState, connectWallet, removeWallet, fetchWalletDetails }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  return useContext(WalletContext);
};

