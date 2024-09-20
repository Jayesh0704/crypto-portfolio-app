// src/components/TokenTransfer.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { ethers } from 'ethers';
import { useWalletContext } from '../contexts/WalletContext';
import ERC20ABI from '../abis/ERC20ABI';

const TokenTransfer = () => {
    const { walletState } = useWalletContext();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isTransferring, setIsTransferring] = useState(false);
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenBalance, setTokenBalance] = useState('0');
    const [decimals, setDecimals] = useState(18);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Load token details on component mount
    useEffect(() => {
        const loadTokenDetails = async () => {
            if (!walletState.isConnected) return;

            try {
                const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT);
                const contract = new ethers.Contract(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS, ERC20ABI, provider);

                const symbol = await contract.symbol();
                const tokenDecimals = await contract.decimals();
                const balance = await contract.balanceOf(walletState.address);
                const formattedBalance = ethers.utils.formatUnits(balance, tokenDecimals);

                setTokenSymbol(symbol);
                setDecimals(tokenDecimals);
                setTokenBalance(formattedBalance);
            } catch (error) {
                console.error('Error loading token details:', error);
                setSnackbar({ open: true, message: 'Failed to load token details.', severity: 'error' });
            }
        };

        loadTokenDetails();
    }, [walletState.isConnected, walletState.address]);

    // Handle Snackbar close
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Handle Token Transfer
    const handleTransfer = async (e) => {
        e.preventDefault();

        // Input Validations
        if (!ethers.utils.isAddress(recipient)) {
            setSnackbar({ open: true, message: 'Invalid recipient address.', severity: 'error' });
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            setSnackbar({ open: true, message: 'Invalid transfer amount.', severity: 'error' });
            return;
        }

        if (Number(amount) > Number(tokenBalance)) {
            setSnackbar({ open: true, message: 'Amount exceeds your token balance.', severity: 'error' });
            return;
        }

        try {
            setIsTransferring(true);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS, ERC20ABI, signer);

            const amountInUnits = ethers.utils.parseUnits(amount, decimals);

            const tx = await contract.transfer(recipient, amountInUnits);
            setSnackbar({ open: true, message: `Transaction sent. Tx Hash: ${tx.hash}`, severity: 'info' });

            await tx.wait(); // Wait for confirmation
            setSnackbar({ open: true, message: 'Transfer successful!', severity: 'success' });

            // Update Token Balance
            const updatedBalance = await contract.balanceOf(walletState.address);
            const formattedBalance = ethers.utils.formatUnits(updatedBalance, decimals);
            setTokenBalance(formattedBalance);

            // Reset Form
            setRecipient('');
            setAmount('');
        } catch (error) {
            console.error('Transfer failed:', error);
            let message = 'Transfer failed. Please try again.';
            if (error.data && error.data.message) {
                message = error.data.message;
            }
            setSnackbar({ open: true, message, severity: 'error' });
        } finally {
            setIsTransferring(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4, border: '1px solid #ccc', borderRadius: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                ERC-20 Token Transfer
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Token Balance:</strong> {tokenBalance} {tokenSymbol}
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
                    label={`Amount (${tokenSymbol})`}
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: 'any', min: '0' }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                    error={amount !== '' && Number(amount) > Number(tokenBalance)}
                    helperText={amount !== '' && Number(amount) > Number(tokenBalance) ? 'Amount exceeds balance.' : ''}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isTransferring}
                    sx={{ mt: 2 }}
                >
                    {isTransferring ? <CircularProgress size={24} color="inherit" /> : 'Transfer'}
                </Button>
            </form>
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
