import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Menu,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useWalletContext } from "../../contexts/WalletContext";
import { CryptoState } from "../../contexts/CryptoContext";

const Header = () => {
  const { walletState, connectWallet, disconnectWallet } = useWalletContext();
  const { currency, setCurrency } = CryptoState();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "My Watchlist", path: "/watchlist" },
    { label: "Token Transfer", path: "/token-transfer" },
    { label: "Allowance Check", path: "/allowance-check" },
    { label: "Approve Allowance", path: "/allowance-approve" },
  ];

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "#30c0bf",
            fontWeight: "bold",
            textDecoration: "none",
            fontFamily: "Montserrat",
          }}
        >
          CryptoDocker
        </Typography>
        {walletState.isConnected ? (
          <>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginRight: 2,
                color: "#30c0bf",
                borderColor: "#30c0bf",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30c0bf",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30c0bf",
                },
                "& .MuiSvgIcon-root": {
                  color: "#30c0bf",
                },
              }}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"JPY"}>JPY</MenuItem>
            </Select>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ color: "#30c0bf" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleClose}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: "#30c0bf",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              
                </Menu>
              </>
            ) : (
              <Box>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      color: "#30c0bf",
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
         
              </Box>
            )}
          </>
        ) : (
          <Button
            color="inherit"
            onClick={connectWallet}
            sx={{
              color: "#30c0bf",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;