// src/components/TokenTransfer.jsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { ethers } from 'ethers';
import { useWalletContext } from '../contexts/WalletContext';

const TokenTransfer = () => {
    const { walletState } = useWalletContext();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Function to check and switch to Sepolia network
    const switchToSepolia = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia Chain ID
            });
            setError(''); // Reset any error messages
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0xaa36a7', // Sepolia Chain ID
                                chainName: 'Sepolia Test Network',
                                rpcUrls: ['https://sepolia.infura.io/v3/41af8187f146429cbeea6f267f1b7891'],
                                nativeCurrency: {
                                    name: 'Sepolia ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                blockExplorerUrls: ['https://sepolia.etherscan.io'],
                            },
                        ],
                    });
                    setError('');
                } catch (addError) {
                    setError('Failed to add Sepolia network to MetaMask.');
                }
            } else {
                setError('Failed to switch to Sepolia network. Please try again.');
            }
        }
    };

    // Handle Token Transfer (ETH in this case)
    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            if (!window.ethereum) {
                setError('MetaMask is not installed. Please install it to send transactions.');
                return;
            }

            setLoading(true);
            setError('');
            setTransactionHash('');

            // Switch to Sepolia network if not already on it
            await switchToSepolia();

            // Request MetaMask to connect if it isn't already connected
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use MetaMask's provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Validate recipient address
            if (!ethers.utils.isAddress(recipient)) {
                throw new Error('Invalid recipient address.');
            }

            // Validate amount
            if (isNaN(amount) || parseFloat(amount) <= 0) {
                throw new Error('Invalid amount. Please enter a valid number greater than 0.');
            }

            // Get gas price using provider.getFeeData()
            const feeData = await provider.getFeeData();

            // Create the transaction object
            const tx = {
                to: recipient, // Recipient's address
                value: ethers.utils.parseEther(amount), // Convert amount from ETH to wei
                gasLimit: 21000, // Standard gas limit for ETH transfer
                gasPrice: feeData.gasPrice, // Use gas price from feeData
            };

            // Send the transaction using MetaMask's signer
            const transactionResponse = await signer.sendTransaction(tx);

            // Wait for the transaction to be mined
            await transactionResponse.wait();

            // Set transaction hash to show to the user
            setTransactionHash(transactionResponse.hash);
            setSnackbar({ open: true, message: 'Transaction successful!', severity: 'success' });

            // Reset form
            setRecipient('');
            setAmount('');
        } catch (err) {
            if (err.code === 4001) {
                setError('Transaction rejected by the user.');
            } else {
                setError('Transaction failed: ' + err.message);
            }
            setSnackbar({ open: true, message: 'Transaction failed: ' + err.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Handle Snackbar close
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4, border: '1px solid #ccc', borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Send ETH on Sepolia
            </Typography>

            <form onSubmit={handleTransfer}>
                <TextField
                    label="Recipient Address"
                    variant="outlined"
                    fullWidth
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    margin="normal"
                    error={recipient !== '' && !ethers.utils.isAddress(recipient)}
                    helperText={recipient !== '' && !ethers.utils.isAddress(recipient) ? 'Invalid Ethereum address.' : ''}
                />
                <TextField
                    label="Amount (ETH)"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: 'any', min: '0' }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Transaction'}
                </Button>
            </form>

            {transactionHash && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Transaction sent! Hash:{' '}
                    <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                        {transactionHash}
                    </a>
                </Typography>
            )}

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={8000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TokenTransfer;
