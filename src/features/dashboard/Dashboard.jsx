// src/components/Dashboard.jsx

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid2, CircularProgress } from "@mui/material";

import WalletInfo from "../../features/Wallet/WalletInfo";
import { useWalletContext } from "../../contexts/WalletContext";
import {
    slideInFromLeft,
    slideInFromRight,
    staggerSlideInFromTop,
  } from "../../components/Animations"; 
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";

function Dashboard() {
  const { walletState } = useWalletContext();
  const walletAddress = walletState.address;
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  const dashboardRef = useRef(null); // Ref for the dashboard container

  const fetchBalances = async (address) => {
    setLoading(true);
    try {
      // Simulated API response
      const response = {
        data: {
          ETH: { balance: 2.5, price: 3200 },
          BTC: { balance: 0.8, price: 47000 },
        },
      };
      setBalances(response.data);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchBalances(walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    const container = dashboardRef.current;
    if (container) {
      const animateItems = container.querySelectorAll(".animate-item");
      staggerSlideInFromTop(animateItems, 0.2); // Apply staggered animation
    }
  }, []);

  if (!walletAddress) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "q00vh",
          background: "linear-gradient(135deg, #000808, #093D3D, #000808)",
          color: "#fff",
          fontFamily: "Montserrat",
        }}
      >
        <Typography variant="h5">Please connect your wallet.</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={dashboardRef}
      sx={{
       

        background: "linear-gradient(135deg, #000808, #093D3D, #000808)",
        padding: "20px",
        fontFamily: "Montserrat",
        minHeight: "100vh",
        
      }}
    >
        <Header />
      <Box
        ref={dashboardRef}
        sx={{
          
          display: "flex",
          alignItems:"center",
          justifyContent:"center",
          padding: { xs: "20px", md: "40px" },
        }}
      >
        <Grid2 container spacing={4} sx={{ maxWidth: "1200px", width: "100%" }}>
          {/* Left Section: Profile Image and Wallet Info */}
          <Grid2 item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
              className="animate-item"
            >
              {/* Profile Image */}
              <Box
                component="img"
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqO8hDoPisYVZbO2P67W9twto5szKXjKLVD_rCbw9BKAddaHGY"
                alt="Profile"
                sx={{
                  width: { xs: "80px", sm: "120px", md: "150px" },
                  height: { xs: "80px", sm: "120px", md: "150px" },
                  borderRadius: "15%",
                  objectFit: "cover",
                }}
              />

              {/* Wallet Information */}
              <WalletInfo />
            </Box>
            <Typography
              sx={{
                color: "#DCDCDC",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                textDecoration: "none",
                fontSize: 36,
                marginTop: 20,
                marginLeft: 3,
              }}
              className="animate-item" // Add class for animation
            >
              Explore your favourite Cryptos Coins!
            </Typography>

            <Banner />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default Dashboard;



