import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../features/Wallet/WalletSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});
