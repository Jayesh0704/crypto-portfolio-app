// src/features/AllowanceApprove/AllowanceApprove.jsx

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAllowanceContext } from '../../contexts/AllowanceContext';
import { useWalletContext } from '../../contexts/WalletContext';
import { ethers } from 'ethers';

const AllowanceApprove = () => {
    const { walletState } = useWalletContext();
    const { approveAllowance } = useAllowanceContext();

    const [spender, setSpender] = useState('');
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setError('');
        setSuccess('');

        if (!ethers.utils.isAddress(spender)) {
            setError('Please enter a valid Ethereum address for the spender.');
            return;
        }

        if (!walletState.isConnected) {
            setError('Please connect your wallet first.');
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setLoading(true);
        try {
            console.log(`Attempting to approve ${amount} MTK for spender ${spender}`);
            const tx = await approveAllowance(spender, amount);
            console.log(`Approval transaction hash: ${tx.hash}`);
            await tx.wait(); // Wait for the transaction to be mined
            console.log(`Transaction mined: ${tx.hash}`);
            setSuccess(`Successfully approved ${amount} MTK for spender ${spender}. Transaction Hash: ${tx.hash}`);
        } catch (err) {
            console.error('Error approving allowance:', err);
            setError(err.message || 'Failed to approve allowance. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Approve Allowance
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="Spender Address"
                    variant="outlined"
                    fullWidth
                    value={spender}
                    onChange={(e) => setSpender(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Amount (MTK)"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApprove}
                    disabled={loading}
                >
                    {loading ? 'Approving...' : 'Approve'}
                </Button>
            </Box>
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Container>
    );
};

export default AllowanceApprove;
