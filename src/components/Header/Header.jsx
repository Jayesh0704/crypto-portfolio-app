// src/components/Header.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
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
import { staggerSlideInFromTop } from "../Animations"; // Ensure correct path

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
    { label: "Check Cryptos", path: "/coins" },
    { label: "My watchlist", path: "/watchlist" },
    { label: "Token transfer", path: "/token-transfer" },
    { label: "Approve allowance", path: "/allowance-approve" },
    { label: "Allowance check", path: "/allowance-check" },
   
  ];

  // Ref for the container to apply animations
  const headerRef = useRef(null);

  useEffect(() => {
    const container = headerRef.current;
    if (container) {
      const animateItems = container.querySelectorAll(".animate-item");
      staggerSlideInFromTop(animateItems, 0.2); // Apply staggered animation
    }
  }, []);

  return (
    <AppBar position="static"  color="transparent" ref={headerRef} elevation={0}>
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
            textTransform: "none",
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.8rem",
              lg: "2rem",
            },
            transition: "text-shadow 0.3s ease",
            "&:hover": {
              textShadow: "0 0 2px rgba(48, 192, 191, 0.8)",
            },


          }}
          className="animate-item" // Add class for animation
        >
          CryptoDocker
        </Typography>

        {walletState.isConnected ? (
          <>
            {/* Currency Selector */}
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                width: 100,
                height: 40,
                marginRight: 2,
                color: "#DCDCDC",
                "& .MuiSvgIcon-root": {
                  color: "#DCDCDC",
                },
                "& .MuiSelect-select": {
                  padding: "10px 8px",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.9rem",
                    md: "1rem",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30c0bf",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30c0bf",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30c0bf",
                },
                backgroundColor: "transparent",
                borderRadius: 1,
                transition: "border-color 0.3s ease",

              }}
              className="animate-item" // Add class for animation
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"JPY"}>JPY</MenuItem>
            </Select>

            {/* Navigation Items */}
            {isMobile ? (
              <>
                {/* Mobile Menu Icon */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ color: "#30c0bf" }}
                  className="animate-item" // Add class for animation
                >
                  <MenuIcon />
                </IconButton>

                {/* Mobile Menu */}
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
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      backdropFilter: "blur(5px)",

                    },
                  }}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleClose}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: "#DCDCDC",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        textTransform: "none",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                        },
                        transition: "text-shadow 0.3s ease",
                        "&:hover": {
                          textShadow: "0 0 8px rgba(48, 192, 191, 0.8)",
                          color: "#30c0bf",
                        },
                      
                      }}
                      className="animate-item" // Add class for animation
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {menuItems.map((item, index) => (
                  <Typography
                    key={index}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "#DCDCDC",
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                      textDecoration: "none",
                      
                      marginLeft: 3, 
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                      },
                      transition: "text-shadow 0.3s ease, color 0.3s ease",
                      "&:hover": {
                        
                        color: "#30c0bf",
                      },

                    }}
                    className="animate-item" // Add class for animation
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            )}
          </>
        ) : (
          <Typography
            onClick={connectWallet}
            sx={{
              color: "#DCDCDC",
              fontWeight: "bold",
              fontFamily: "Montserrat",
              cursor: "pointer",
              textTransform: "none", 
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
              transition: "text-shadow 0.3s ease, color 0.3s ease",
              "&:hover": {
               
                color: "#30c0bf",
              },
            }}
            className="animate-item" // Add class for animation
          >
            Connect Wallet
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;


// src/components/Header.jsx
