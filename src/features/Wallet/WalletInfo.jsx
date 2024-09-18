// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeWallet } from './WalletSlice';  
// import Button from '@mui/material/Button';

// function WalletInfo() {
//     const wallet = useSelector(state => state.wallet);
//     const dispatch = useDispatch();

//     const handleRemoveWallet = () => {
//         dispatch(removeWallet());
//     };

//     if (!wallet.isConnected) {
//         return <div>Wallet is not connected.</div>;
//     }

//     return (
//         <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
//             <h3>Wallet Address: {wallet.address}</h3>
//             <p>Balance: ${wallet.balance}</p>
//             <p>Net Profit/Loss: ${wallet.profitLoss}</p>
//             <Button variant="contained" color="primary" onClick={handleRemoveWallet}>
//                  Remove Wallet
//             </Button>

//         </div>
//     );
// }

// export default WalletInfo;


import React from 'react';
import { useWalletContext } from '../../contexts/WalletContext'; // Update the import path as needed
import { Box, Typography, Button } from '@mui/material';

function WalletInfo() {
    const { walletState, removeWallet } = useWalletContext();

    if (!walletState.isConnected) {
        return (
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                <Typography variant="h6">Wallet not connected</Typography>
                <Typography variant="body1">Please connect your wallet to view details.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6">Wallet Information</Typography>
            <Typography variant="body1">Address: {walletState.address}</Typography>
            <Typography variant="body2">Balance: {walletState.balance} ETH</Typography>
            <Typography variant="body2">Net Profit/Loss: ${walletState.profitLoss}</Typography>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={removeWallet}
                sx={{ mt: 2 }}
            >
                Disconnect Wallet
            </Button>
        </Box>
    );
}

export default WalletInfo;