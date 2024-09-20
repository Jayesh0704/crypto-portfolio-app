
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { connectWallet } from './WalletSlice'; // Update the import path as needed
// import { Button, TextField, Box, Typography, CircularProgress, Modal } from '@mui/material';
// import { ethers } from 'ethers';

// function WalletConnection() {
//     const [open, setOpen] = useState(false);
//     const [walletAddress, setWalletAddress] = useState('');
//     const [walletInfo, setWalletInfo] = useState(null);
//     const dispatch = useDispatch();

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const connectWalletHandler = async () => {
//         if (window.ethereum) {
//             handleOpen();
//             try {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 await provider.send('eth_requestAccounts', []);
//                 const signer = provider.getSigner();
//                 const address = await signer.getAddress();
//                 fetchWalletDetails(address);
//             } catch (error) {
//                 console.error('Error connecting to MetaMask', error);
//                 handleClose();
//             }
//         } else {
//             alert('Please install MetaMask!');
//         }
//     };

//     const fetchWalletDetails = async (address) => {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const balance = await provider.getBalance(address);
//         const formattedBalance = ethers.utils.formatEther(balance);

//         setTimeout(() => {
//             setWalletInfo({
//                 address,
//                 balance: formattedBalance,
//                 transactions: [] // Placeholder for transaction history
//             });
//             dispatch(connectWallet({ address, balance: formattedBalance })); // Dispatch Redux action
//             handleClose();
//         }, 2000); // Simulate delay for fetching data
//     };

//     const handleManualEntry = (e) => {
//         setWalletAddress(e.target.value);
//     };

//     const handleFetchDetails = () => {
//         if (ethers.utils.isAddress(walletAddress)) {
//             fetchWalletDetails(walletAddress);
//         } else {
//             alert('Invalid Ethereum address');
//         }
//     };

//     return (
//         <Box>
//             <Button variant="outlined" onClick={connectWalletHandler}>Connect Wallet</Button>
//             <TextField
//                 label="Enter wallet address manually"
//                 variant="outlined"
//                 fullWidth
//                 value={walletAddress}
//                 onChange={handleManualEntry}
//                 sx={{ mt: 2, mb: 2 }}
//             />
//             <Button variant="contained" onClick={handleFetchDetails}>Fetch Wallet Details</Button>
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
//                     <Typography variant="h6" component="h2">Fetching Wallet Details...</Typography>
//                     <CircularProgress sx={{ my: 2 }} />
//                 </Box>
//             </Modal>
//             {walletInfo && (
//                 <Box sx={{ p: 2, mt: 2 }}>
//                     <Typography variant="h6">Wallet Address: {walletInfo.address}</Typography>
//                     <Typography variant="body1">Balance: {walletInfo.balance} ETH</Typography>
//                     <Typography variant="body2">Transactions: {walletInfo.transactions.length}</Typography>
//                 </Box>
//             )}
//         </Box>
//     );
// }

// export default WalletConnection;



// import React, { useState } from 'react';
// import { useWalletContext } from '../../contexts/WalletContext'; // Update the import path as needed
// import { Button, TextField, Box, Typography, CircularProgress, Modal } from '@mui/material';
// import { ethers } from 'ethers';

// function WalletConnection() {
//     const [open, setOpen] = useState(false);
//     const [walletAddress, setWalletAddress] = useState('');
//     const { walletState, fetchWalletDetails } = useWalletContext();

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const connectWalletHandler = async () => {
//         if (window.ethereum) {
//             handleOpen();
//             try {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 await provider.send('eth_requestAccounts', []);
//                 const signer = provider.getSigner();
//                 const address = await signer.getAddress();
//                 await fetchWalletDetails(address);
//                 handleClose();
//             } catch (error) {
//                 console.error('Error connecting to MetaMask', error);
//                 handleClose();
//             }
//         } else {
//             alert('Please install MetaMask!');
//         }
//     };

//     const handleManualEntry = (e) => {
//         setWalletAddress(e.target.value);
//     };

//     const handleFetchDetails = async () => {
//         if (ethers.utils.isAddress(walletAddress)) {
//             handleOpen();
//             await fetchWalletDetails(walletAddress);
//             handleClose();
//         } else {
//             alert('Invalid Ethereum address');
//         }
//     };

//     return (
//         <Box>
//             <Button variant="contained" onClick={connectWalletHandler}>Connect Wallet</Button>
//             <TextField
//                 label="Enter wallet address manually"
//                 variant="outlined"
//                 fullWidth
//                 value={walletAddress}
//                 onChange={handleManualEntry}
//                 sx={{ mt: 2, mb: 2 }}
//             />
//             <Button variant="outlined" onClick={handleFetchDetails}>Fetch Wallet Details</Button>
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
//                     <Typography variant="h6" component="h2">Fetching Wallet Details...</Typography>
//                     <CircularProgress sx={{ my: 2 }} />
//                 </Box>
//             </Modal>
//             {walletState.isConnected && (
//                 <Box sx={{ p: 2, mt: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
//                     <Typography variant="h6">Connected Wallet</Typography>
//                     <Typography variant="body1">Address: {walletState.address}</Typography>
//                     <Typography variant="body2">Balance: {walletState.balance} ETH</Typography>
//                 </Box>
//             )}
//         </Box>
//     );
// }

// export default WalletConnection;





// src/features/Wallet/WalletConnection.jsx

import React, { useState } from 'react';
import { useWalletContext } from '../../contexts/WalletContext'; // Update the import path as needed
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

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Handler for connecting wallet via MetaMask
    const connectWalletHandler = async () => {
        if (window.ethereum) {
            handleOpen();
            try {
                await connectWallet(); // Connects and updates walletState
                await fetchWalletDetails(); // Fetches updated wallet details without arguments
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

    // Handler for manual wallet address entry
    const handleManualEntry = (e) => {
        setWalletAddress(e.target.value);
    };

    // Function to fetch details for a manually entered address
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

            setManualWalletInfo({
                address: walletAddress,
                balance: formattedBalance,
            });
            setSnackbar({ open: true, message: 'Wallet details fetched successfully!', severity: 'success' });
        } catch (error) {
            console.error('Error fetching wallet details:', error);
            setSnackbar({ open: true, message: 'Error fetching wallet details', severity: 'error' });
        } finally {
            handleClose();
        }
    };

    return (
        <Box>
            {/* Connect Wallet Button */}
            <Button variant="contained" onClick={connectWalletHandler}>Connect Wallet</Button>

            {/* Manual Wallet Address Entry */}
            <TextField
                label="Enter wallet address manually"
                variant="outlined"
                fullWidth
                value={walletAddress}
                onChange={handleManualEntry}
                sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="outlined" onClick={handleFetchDetails}>Fetch Wallet Details</Button>

            {/* Loading Modal */}
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

            {/* Connected Wallet Information */}
            {walletState.isConnected && (
                <Box sx={{ p: 2, mt: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h6">Connected Wallet</Typography>
                    <Typography variant="body1">Address: {walletState.address}</Typography>
                    <Typography variant="body2">Balance: {walletState.ethBalance} ETH</Typography>
                </Box>
            )}

            {/* Manual Wallet Information */}
            {manualWalletInfo && (
                <Box sx={{ p: 2, mt: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h6">Manual Wallet Information</Typography>
                    <Typography variant="body1">Address: {manualWalletInfo.address}</Typography>
                    <Typography variant="body2">Balance: {manualWalletInfo.balance} ETH</Typography>
                </Box>
            )}

            {/* Snackbar for User Feedback */}
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
