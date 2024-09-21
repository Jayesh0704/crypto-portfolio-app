// src/features/Wallet/WalletInfo.jsx

// import React from 'react';
// import { useWalletContext } from '../../contexts/WalletContext'; // Update the import path as needed
// import { Box, Typography, Button } from '@mui/material';

// function WalletInfo() {
//     const { walletState, disconnectWallet } = useWalletContext();

//     if (!walletState.isConnected) {
//         return (
//             <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
//                 <Typography variant="h6">Wallet not connected</Typography>
//                 <Typography variant="body1">Please connect your wallet to view details.</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
//             <Typography variant="h6">Wallet Information</Typography>
//             <Typography variant="body1">Address: {walletState.address}</Typography>
//             <Typography variant="body2">Balance: {walletState.ethBalance} ETH</Typography>
//             <Typography variant="body2">Net Profit/Loss: ${walletState.profitLoss}</Typography>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={disconnectWallet}
//                 sx={{ mt: 2 }}
//             >
//                 Disconnect Wallet
//             </Button>
//         </Box>
//     );
// }

// export default WalletInfo;

// src/features/Wallet/WalletInfo.jsx

import React from "react";
import { useWalletContext } from "../../contexts/WalletContext";
import { Box, Typography, Button } from "@mui/material";
import { staggerSlideInFromTop } from "../../components/Animations"; // Ensure correct path
import { useEffect, useRef } from "react";



function WalletInfo() {
  const { walletState, disconnectWallet } = useWalletContext();
  const infoRef = useRef(null); // Ref for the wallet info container

  useEffect(() => {
    const container = infoRef.current;
    if (container) {
      const animateItems = container.querySelectorAll(".animate-item");
      staggerSlideInFromTop(animateItems, 0.2); // Apply staggered animation
    }
  }, []);

  if (!walletState.isConnected) {
    return (
        <Box
          ref={infoRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="h6" className="animate-item">
            Wallet not connected
          </Typography>
          <Typography variant="body1" className="animate-item">
            Please connect your wallet to view details.
          </Typography>
        </Box>
      );
    }
  
    return (
      <Box
        ref={infoRef}
        sx={{
          display: "flex",
          flexDirection:"row",
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 2,
          color: "#DCDCDC",
          width: "100%",
        }}
      >

        {/* Wallet Information */}
        <Box
          className="wallet-details animate-item"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            textAlign: { xs: "left", sm: "left" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: ".6rem", sm: "1.4rem", md: "1.5rem" },
            }}
          >
            Wallet Information
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xxs:"0.3rem", xs: "0.4rem", sm: "1rem", md: "1rem" },
            }}
          >
            <strong>Address:</strong> <br/>{walletState.address}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".4rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            <strong>Balance:</strong> {walletState.ethBalance} ETH
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".4rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            <strong>Net Profit/Loss:</strong> ${walletState.profitLoss}
          </Typography>
        </Box>
  
        {/* Disconnect Wallet Button */}
        <Button
          variant="contained"
          color="error" // Use MUI's predefined color
          onClick={disconnectWallet}
          className="disconnect-btn animate-item"
          sx={{
            mt: { xs: 2, sm: 0 },
            alignSelf:{xs:"start", sm:"center", md:"center"},
            backgroundColor: "#ff4d4d",
            "&:hover": { backgroundColor: "#ff1a1a" },
            width :{xs:"50px",sm:"150px",md:"230px"},
            fontSize: { xs: "0.3rem", sm: "0.9rem", md: "1rem" }, // Responsive font size
            padding: { xs: "4px 4px", sm: "8px 16px", md: "10px 20px" }, // Responsive padding
            marginLeft:{xs:".1vh", sm: "15vh", md: "30vh"},
          }}
        >
          Disconnect Wallet
        </Button>
      </Box>
    );
  }
  
  export default WalletInfo;