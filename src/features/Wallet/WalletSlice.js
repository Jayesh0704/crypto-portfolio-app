import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: '',
        balance: 0,
        profitLoss: 0,
        isConnected: false,
    },
    reducers: {
        connectWallet: (state, action) => {
            // Assuming action.payload contains { address, balance, profitLoss }
            state.address = action.payload.address;
            state.balance = action.payload.balance;
            state.profitLoss = action.payload.profitLoss;
            state.isConnected = true; // Set isConnected to true when wallet is connected
        },
        removeWallet: (state) => {
            state.address = '';
            state.balance = 0;
            state.profitLoss = 0;
            state.isConnected = false; // Set isConnected to false when wallet is removed
        },
    },
});

// Destructure and export the actions
export const { connectWallet, removeWallet } = walletSlice.actions;

// Default export the reducer
export default walletSlice.reducer;
