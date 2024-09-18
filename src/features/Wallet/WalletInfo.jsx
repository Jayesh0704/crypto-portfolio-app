import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWallet } from './WalletSlice';  
import Button from '@mui/material/Button';

function WalletInfo() {
    const wallet = useSelector(state => state.wallet);
    const dispatch = useDispatch();

    const handleRemoveWallet = () => {
        dispatch(removeWallet());
    };

    if (!wallet.isConnected) {
        return <div>Wallet is not connected.</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
            <h3>Wallet Address: {wallet.address}</h3>
            <p>Balance: ${wallet.balance}</p>
            <p>Net Profit/Loss: ${wallet.profitLoss}</p>
            <Button variant="contained" color="primary" onClick={handleRemoveWallet}>
                 Remove Wallet
            </Button>

        </div>
    );
}

export default WalletInfo;
