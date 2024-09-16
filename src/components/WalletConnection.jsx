// import React, { useState } from 'react';
// import { Button, TextField, Box } from '@mui/material';
// import { ethers } from 'ethers';

// function WalletConnection() {
//   const [address, setAddress] = useState('');

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send('eth_requestAccounts', []);
//         const signer = provider.getSigner();
//         const addr = await signer.getAddress();
//         setAddress(addr);
//       } catch (err) {
//         console.error('Error connecting to MetaMask', err);
//       }
//     } else {
//       alert('MetaMask is not installed!');
//     }
//   };

//   return (
//     <Box>
//       <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
//       <TextField
//         label="Enter wallet address manually"
//         variant="outlined"
//         fullWidth
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         margin="normal"
//       />
//     </Box>
//   );
// }

// export default WalletConnection;


// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { Button, Modal, Box, Typography, CircularProgress } from '@mui/material';

// function WalletConnection() {
//     const [open, setOpen] = useState(false);
//     const [walletInfo, setWalletInfo] = useState(null);

//     // Function to connect to MetaMask and fetch wallet details
//     const connectWallet = async () => {
//         if (window.ethereum) {
//             try {
//                 setOpen(true); // Show loading modal
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 await provider.send('eth_requestAccounts', []);
//                 const signer = provider.getSigner();
//                 const address = await signer.getAddress();
//                 const balance = await provider.getBalance(address);
//                 const formattedBalance = ethers.utils.formatEther(balance);

//                 // Simulating fetching additional details like transaction history
//                 setTimeout(() => {
//                     setWalletInfo({
//                         address,
//                         balance: formattedBalance,
//                         transactions: [] // Assuming no transactions for simplicity
//                     });
//                     setOpen(false); // Hide modal after fetching data
//                 }, 2000); // Simulate a network request delay
//             } catch (error) {
//                 console.error('Error connecting to MetaMask', error);
//                 setOpen(false);
//             }
//         } else {
//             alert('Please install MetaMask!');
//         }
//     };

//     return (
//         <div>
//             <Button variant="outlined" onClick={connectWallet}>Connect Wallet</Button>
//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 aria-labelledby="loading-modal-title"
//                 aria-describedby="loading-modal-description"
//             >
//                 <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
//                     <Typography id="loading-modal-title" variant="h6">Connecting to Wallet</Typography>
//                     <CircularProgress />
//                     <Typography id="loading-modal-description" sx={{ mt: 2 }}>Fetching wallet details...</Typography>
//                 </Box>
//             </Modal>
//             {walletInfo && (
//                 <Box sx={{ p: 2 }}>
//                     <Typography variant="h6">Wallet Address: {walletInfo.address}</Typography>
//                     <Typography variant="body1">Balance: {walletInfo.balance} ETH</Typography>
//                     <Typography variant="body2">Transactions: {walletInfo.transactions.length}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// export default WalletConnection;



import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Box, Typography, CircularProgress, Modal } from '@mui/material';

function WalletConnection() {
    const [open, setOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletInfo, setWalletInfo] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            handleOpen();
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                fetchWalletDetails(address);
            } catch (error) {
                console.error('Error connecting to MetaMask', error);
                handleClose();
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const fetchWalletDetails = async (address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);

        
        setTimeout(() => {
            setWalletInfo({
                address,
                balance: formattedBalance,
                transactions: [] 
            });
            handleClose();
        }, 2000);
    };

    const handleManualEntry = (e) => {
        setWalletAddress(e.target.value);
    };

    const handleFetchDetails = () => {
        if (ethers.utils.isAddress(walletAddress)) {
            fetchWalletDetails(walletAddress);
        } else {
            alert('Invalid Ethereum address');
        }
    };

    return (
        <Box>
            <Button variant="outlined" onClick={connectWallet}>Connect Wallet</Button>
            <TextField
                label="Enter wallet address manually"
                variant="outlined"
                fullWidth
                value={walletAddress}
                onChange={handleManualEntry}
                sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="contained" onClick={handleFetchDetails}>Fetch Wallet Details</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2">Fetching Wallet Details...</Typography>
                    <CircularProgress sx={{ my: 2 }} />
                </Box>
            </Modal>
            {walletInfo && (
                <Box sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">Wallet Address: {walletInfo.address}</Typography>
                    <Typography variant="body1">Balance: {walletInfo.balance} ETH</Typography>
                    <Typography variant="body2">Transactions: {walletInfo.transactions.length}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default WalletConnection;
