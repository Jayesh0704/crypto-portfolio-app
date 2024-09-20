// src/components/Coin/AllowanceCheck.jsx 

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAllowanceContext } from '../../contexts/AllowanceContext';
import { useWalletContext } from '../../contexts/WalletContext';
import { ethers } from 'ethers';

const AllowanceCheck = () => {
    const { walletState } = useWalletContext();
    const { checkAllowance } = useAllowanceContext();

    const [spender, setSpender] = useState('');
    const [allowance, setAllowance] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckAllowance = async () => {
        setError('');
        setAllowance(null);

        if (!ethers.utils.isAddress(spender)) {
            setError('Please enter a valid Ethereum address for the spender.');
            return;
        }

        if (!walletState.isConnected) {
            setError('Please connect your wallet first.');
            return;
        }

        setLoading(true);
        try {
            const allowanceAmount = await checkAllowance(walletState.address, spender);
            setAllowance(allowanceAmount);
        } catch (err) {
            console.error('Error fetching allowance:', err);
            setError(err.message || 'Failed to fetch allowance. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Allowance Check
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckAllowance}
                    disabled={loading}
                >
                    {loading ? 'Checking...' : 'Check Allowance'}
                </Button>
            </Box>
            {allowance !== null && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Current Allowance: {allowance} MTK
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

export default AllowanceCheck;
