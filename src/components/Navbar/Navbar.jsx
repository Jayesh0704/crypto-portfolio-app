import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Navbar() {
    return (
        <AppBar position="static" color="default" sx={{ marginBottom: 4 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <AccountBalanceWalletIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <InputBase
                        placeholder="Asset, wallet, domain or identity"
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ ml: 1, flex: 1, color: 'inherit' }}
                    />
                </Box>
                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>
                <IconButton color="inherit">
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
