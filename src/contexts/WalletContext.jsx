// src/contexts/WalletContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletState, setWalletState] = useState({
        address: '',
        ethBalance: '0',
        profitLoss: 0, // Assuming this is part of your state
        isConnected: false,
    });

    // Function to connect wallet
    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const balance = await provider.getBalance(address);
                const formattedBalance = ethers.utils.formatEther(balance);

                setWalletState({
                    address,
                    ethBalance: formattedBalance,
                    profitLoss: 0, // Initialize or fetch as needed
                    isConnected: true,
                });
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                setWalletState({
                    address: '',
                    ethBalance: '0',
                    profitLoss: 0,
                    isConnected: false,
                });
            }
        } else {
            alert('Please install MetaMask!');
        }
    }, []);

    // Function to disconnect wallet
    const disconnectWallet = useCallback(() => {
        setWalletState({
            address: '',
            ethBalance: '0',
            profitLoss: 0,
            isConnected: false,
        });
    }, []);

    // Function to fetch wallet details
    const fetchWalletDetails = useCallback(async () => {
        if (!walletState.isConnected || !walletState.address) return;

        try {
            // Use Infura's Sepolia endpoint from environment variables
            const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT);
            const balance = await provider.getBalance(walletState.address);
            const formattedBalance = ethers.utils.formatEther(balance);

            setWalletState((prevState) => ({
                ...prevState,
                ethBalance: formattedBalance,
            }));
        } catch (error) {
            console.error('Error fetching wallet details:', error);
        }
    }, [walletState.isConnected, walletState.address]);

    // Handle account and network changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    connectWallet();
                    fetchWalletDetails();
                } else {
                    disconnectWallet();
                }
            });

            window.ethereum.on('chainChanged', (_chainId) => {
                window.location.reload();
            });
        }
    }, [connectWallet, disconnectWallet, fetchWalletDetails]);

    return (
        <WalletContext.Provider value={{ walletState, connectWallet, disconnectWallet, fetchWalletDetails }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    return useContext(WalletContext);
};
