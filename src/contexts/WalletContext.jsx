// src/contexts/WalletContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

/**
 * @dev WalletProvider manages the wallet connection state and provides provider and signer to the application.
 */
export const WalletProvider = ({ children }) => {
    const [walletState, setWalletState] = useState({
        address: '',
        ethBalance: '0',
        isConnected: false,
    });
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    // Function to connect wallet
    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                // Request account access
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                await web3Provider.send("eth_requestAccounts", []);
                const signer = web3Provider.getSigner();
                const address = await signer.getAddress();
                const balance = await web3Provider.getBalance(address);
                const formattedBalance = ethers.utils.formatEther(balance);

                setProvider(web3Provider);
                setSigner(signer);
                setWalletState({
                    address,
                    ethBalance: formattedBalance,
                    isConnected: true,
                });
                console.log(`Wallet connected: ${address}`);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                setWalletState({
                    address: '',
                    ethBalance: '0',
                    isConnected: false,
                });
            }
        } else {
            alert('Please install MetaMask!');
        }
    }, []);

    // Function to disconnect wallet
    const disconnectWallet = useCallback(() => {
        setProvider(null);
        setSigner(null);
        setWalletState({
            address: '',
            ethBalance: '0',
            isConnected: false,
        });
        console.log('Wallet disconnected');
    }, []);

    // Function to fetch wallet details
    const fetchWalletDetails = useCallback(async () => {
        if (!walletState.isConnected || !walletState.address || !provider) return;

        try {
            const balance = await provider.getBalance(walletState.address);
            const formattedBalance = ethers.utils.formatEther(balance);

            setWalletState((prevState) => ({
                ...prevState,
                ethBalance: formattedBalance,
            }));
            console.log(`Fetched balance: ${formattedBalance} ETH`);
        } catch (error) {
            console.error('Error fetching wallet details:', error);
        }
    }, [walletState.isConnected, walletState.address, provider]);

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
        <WalletContext.Provider value={{ walletState, connectWallet, disconnectWallet, fetchWalletDetails, provider, signer }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    return useContext(WalletContext);
};
