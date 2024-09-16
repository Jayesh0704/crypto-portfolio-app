// src/features/Wallet/WalletSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    isConnected: false,
    address: null,
    balance: {},
    transactions: [],
  },
  reducers: {
    connectWallet: (state, action) => {
      state.isConnected = true;
      state.address = action.payload.address;
      // Add more initial states as needed
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.balance = {};
      state.transactions = [];
    },
    // Add additional reducers for other wallet interactions if necessary
  },
});

// Export the actions
export const { connectWallet, disconnectWallet } = walletSlice.actions;

// Export the reducer
export default walletSlice.reducer;
