import React, { useState } from 'react';
import { useWalletContext } from '../../contexts/WalletContext'; 
import { Button, TextField, Box, Typography, CircularProgress, Modal, Snackbar, Alert } from '@mui/material';
import { ethers } from 'ethers';

function WalletConnection() {
    const [open, setOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const { walletState, connectWallet, fetchWalletDetails } = useWalletContext();
    const [manualWalletInfo, setManualWalletInfo] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            handleOpen();
            try {
                await connectWallet();
                await fetchWalletDetails();
                setSnackbar({ open: true, message: 'Wallet connected successfully!', severity: 'success' });
                handleClose();
            } catch (error) {
                console.error('Error connecting to MetaMask', error);
                setSnackbar({ open: true, message: 'Error connecting to MetaMask', severity: 'error' });
                handleClose();
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const handleManualEntry = (e) => {
        setWalletAddress(e.target.value);
    };

    const handleFetchDetails = async () => {
        if (!ethers.utils.isAddress(walletAddress)) {
            setSnackbar({ open: true, message: 'Invalid Ethereum address', severity: 'error' });
            return;
        }
        handleOpen();
        try {
            const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT);
            const balance = await provider.getBalance(walletAddress);
            const formattedBalance = ethers.utils.formatEther(balance);
            setManualWalletInfo({ address: walletAddress, balance: formattedBalance });
            setSnackbar({ open: true, message: 'Wallet details fetched successfully!', severity: 'success' });
        } catch (error) {
            console.error('Error fetching wallet details:', error);
            setSnackbar({ open: true, message: 'Error fetching wallet details', severity: 'error' });
        } finally {
            handleClose();
        }
    };

    return (
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #093D3D, #000808)',
            padding: '20px',
            textAlign: 'center'
        }}>
             <Typography variant="h2" fontWeight="Bold" sx={{ fontFamily: 'Poppins', color: '#fff', mb: 3 }}>CryptoDocker</Typography>
            <Typography variant="h3" sx={{ fontFamily: 'Poppins', color: '#fff', mb: 3 }}>Your crypto portfolio on the rise</Typography>

            <Button variant="contained" onClick={connectWalletHandler} sx={{
                backgroundColor: '#30C0BF', 
                color: '#fff', 
                '&:hover': { backgroundColor: '#2AA4A4' },
                mb: 3, 
                px: 4, 
                py: 1.5,
                fontSize: '1rem'
            }}>
                Connect Wallet
            </Button>

            {/* <TextField
                label="Enter wallet address manually"
                variant="outlined"
                fullWidth
                value={walletAddress}
                onChange={handleManualEntry}
                sx={{ mt: 2, mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
            /> */}

<TextField
  label="Enter wallet address"
  variant="outlined"
  fullWidth
  value={walletAddress}
  onChange={handleManualEntry}
  sx={{
    mt: 2,
    mb: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
    '& .MuiInputLabel-root': { color: '#333' }, // Dark colored label
    '& .MuiInputLabel-root.Mui-focused': { color: '#000' }, // Even darker when focused
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#333' }, // Border color
      '&:hover fieldset': { borderColor: '#666' }, // Border on hover
      '&.Mui-focused fieldset': { borderColor: '#000' }, // Border on focus
    },
  }}
 
/>

            <Button variant="outlined" onClick={handleFetchDetails} sx={{
                color: '#fff',
                borderColor: '#fff',
                '&:hover': { borderColor: '#ddd' },
                px: 4, py: 1.5, fontSize: '1rem'
            }}>Fetch Wallet Details</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">Fetching Wallet Details...</Typography>
                    <CircularProgress sx={{ my: 2 }} />
                </Box>
            </Modal>

            {walletState.isConnected && (
                <Box sx={{ p: 2, mt: 3, backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
                    <Typography variant="h6">Connected Wallet</Typography>
                    <Typography variant="body1">Address: {walletState.address}</Typography>
                    <Typography variant="body2">Balance: {walletState.ethBalance} ETH</Typography>
                </Box>
            )}

            {manualWalletInfo && (
                <Box sx={{ p: 2, mt: 3, backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
                    <Typography variant="h6">Manual Wallet Information</Typography>
                    <Typography variant="body1">Address: {manualWalletInfo.address}</Typography>
                    <Typography variant="body2">Balance: {manualWalletInfo.balance} ETH</Typography>
                </Box>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default WalletConnection;
