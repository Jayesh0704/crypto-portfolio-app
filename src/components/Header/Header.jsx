import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useWalletContext } from "../../contexts/WalletContext";
import { CryptoState } from "../../contexts/CryptoContext";

const Header = () => {
  const { walletState, connectWallet, disconnectWallet } = useWalletContext();
  const { currency, setCurrency, symbol } = CryptoState();

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CryptoDocker
        </Typography>
        {walletState.isConnected ? (
          <>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"JPY"}>JPY</MenuItem>
            </Select>

            <Button component={Link} to="/watchlist" color="inherit">
              My Watchlist
            </Button>
            <Button color="inherit" component={Link} to="/token-transfer">
              Token Transfer
            </Button>
            <Button color="inherit" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
