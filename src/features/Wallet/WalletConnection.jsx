// // src/components/WalletConnection.jsx

// import React, { useState, useRef, useEffect } from "react";
// import { useWalletContext } from "../../contexts/WalletContext";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
//   Modal,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { ethers } from "ethers";
// import { staggerSlideInFromTop } from "../../components/Animations";

// function WalletConnection() {
//   const [open, setOpen] = useState(false);
//   const [walletAddress, setWalletAddress] = useState("");
//   const { walletState, connectWallet, fetchWalletDetails } = useWalletContext();
//   const [manualWalletInfo, setManualWalletInfo] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   const connectWalletHandler = async () => {
//     if (window.ethereum) {
//       handleOpen();
//       try {
//         await connectWallet();
//         await fetchWalletDetails();
//         setSnackbar({
//           open: true,
//           message: "Wallet connected successfully!",
//           severity: "success",
//         });
//         handleClose();
//       } catch (error) {
//         console.error("Error connecting to MetaMask", error);
//         setSnackbar({
//           open: true,
//           message: "Error connecting to MetaMask",
//           severity: "error",
//         });
//         handleClose();
//       }
//     } else {
//       alert("Please install MetaMask!");
//     }
//   };

//   const handleManualEntry = (e) => {
//     setWalletAddress(e.target.value);
//   };

//   const handleFetchDetails = async () => {
//     if (!ethers.utils.isAddress(walletAddress)) {
//       setSnackbar({
//         open: true,
//         message: "Invalid Ethereum address",
//         severity: "error",
//       });
//       return;
//     }
//     handleOpen();
//     try {
//       const provider = new ethers.providers.JsonRpcProvider(
//         import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT
//       );
//       const balance = await provider.getBalance(walletAddress);
//       const formattedBalance = ethers.utils.formatEther(balance);
//       setManualWalletInfo({
//         address: walletAddress,
//         balance: formattedBalance,
//       });
//       setSnackbar({
//         open: true,
//         message: "Wallet details fetched successfully!",
//         severity: "success",
//       });
//     } catch (error) {
//       console.error("Error fetching wallet details:", error);
//       setSnackbar({
//         open: true,
//         message: "Error fetching wallet details",
//         severity: "error",
//       });
//     } finally {
//       handleClose();
//     }
//   };

//   // Ref for the container to apply animations
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       const animateItems = container.querySelectorAll(".animate-item");
//       staggerSlideInFromTop(animateItems, 0.2);
//     }
//   }, []);

//   return (
//     <Box
//       ref={containerRef} // Assign ref to the container
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #000808, #093D3D, #000808)",
//         padding: "20px",
//         textAlign: "center",
//         gap: 3,
//       }}
//     >
//       <Typography
//         variant="h2"
//         fontWeight="Bold"
//         sx={{ fontFamily: "Poppins", color: "#fff" }}
//         className="animate-item" // Add class for animation
//       >
//         CryptoDocker
//       </Typography>
//       <Typography
//         variant="h4"
//         sx={{ fontFamily: "Poppins", color: "#fff" }}
//         className="animate-item" // Add class for animation
//       >
//         Harbor for All Your Crypto Operations
//       </Typography>

//       <Button
//         variant="contained"
//         onClick={connectWalletHandler}
//         className="animate-item" // Add class for animation
//         sx={{
//           backgroundColor: "#30C0BF",
//           color: "#fff",
//           "&:hover": { backgroundColor: "#2AA4A4" },
//           px: 4,
//           py: 1.5,
//           fontSize: "1rem",
//         }}
//       >
//         Connect Wallet
//       </Button>
//       <span className="animate-item">OR</span>

//       {/* Adjusted Input Field */}
//       <Box sx={{ width: "400px" }} className="animate-item">
//         <TextField
//           label="Enter wallet address"
//           variant="outlined"
//           value={walletAddress}
//           onChange={handleManualEntry}
//           sx={{
//             backgroundColor: "#fff",
//             borderRadius: 1,

//             "& .MuiInputLabel-root": { color: "#333" }, // Dark colored label
//             "& .MuiInputLabel-root.Mui-focused": { color: "#888",transform: 'translate(4px, -4px) scale(0.7)', }, // Even darker when focused
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#333" }, // Border color
//               "&:hover fieldset": { borderColor: "#666" }, // Border on hover
//               "&.Mui-focused fieldset": { borderColor: "#000" }, // Border on focus
//               "& .MuiOutlinedInput-input": {
//                 padding: "4px 26px", // Increase padding for better usability
//               },
//             },
//           }}
//           slotProps={{
//             input: { style: { padding: "10px 12px", color: "#000" } }, // Adjust internal padding
//           }}
//         />
//       </Box>

//       <Button
//         variant="outlined"
//         onClick={handleFetchDetails}
//         className="animate-item" // Add class for animation
//         sx={{
//           color: "#fff",
//           borderColor: "#fff",
//           "&:hover": { borderColor: "#ddd" },
//           px: 4,
//           py: 1.5,
//           fontSize: "1rem",
//         }}
//       >
//         Fetch Wallet Details
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" component="h2">
//             Fetching Wallet Details...
//           </Typography>
//           <CircularProgress sx={{ my: 2 }} />
//         </Box>
//       </Modal>

//       {walletState.isConnected && (
//         <Box
//           sx={{
//             p: 2,
//             mt: 3,
//             backgroundColor: "#fff",
//             borderRadius: "8px",
//             boxShadow: 3,
//             width: "400px",
//           }}
//           className="animate-item" // Add class for animation
//         >
//           <Typography variant="h6">Connected Wallet</Typography>
//           <Typography variant="body1">
//             Address: {walletState.address}
//           </Typography>
//           <Typography variant="body2">
//             Balance: {walletState.ethBalance} ETH
//           </Typography>
//         </Box>
//       )}

//       {manualWalletInfo && (
//         <Box
//           sx={{
//             p: 2,
//             mt: 3,
//             backgroundColor: "#fff",
//             borderRadius: "8px",
//             boxShadow: 3,
//             width: "400px",
//           }}
//           className="animate-item" // Add class for animation
//         >
//           <Typography variant="h6">Manual Wallet Information</Typography>
//           <Typography variant="body1">
//             Address: {manualWalletInfo.address}
//           </Typography>
//           <Typography variant="body2">
//             Balance: {manualWalletInfo.balance} ETH
//           </Typography>
//         </Box>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default WalletConnection;


// src/components/WalletConnection.jsx

import React, { useState, useRef, useEffect } from "react";
import { useWalletContext } from "../../contexts/WalletContext";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; // Correctly imported styled and useTheme
import { ethers } from "ethers";
import { staggerSlideInFromTop } from "../../components/Animations";

// Styled Components
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #000808, #093D3D, #000808)",
  padding: theme.spacing(2),
  textAlign: "center",
  gap: theme.spacing(3),
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    gap: theme.spacing(2),
  },
}));

const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputLabel-root": {
    color: "#333",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#888",
    transform: "translate(4px, -4px) scale(0.7)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px",
      color: "#000",
    },
  },
}));

const ResponsiveButton = styled(Button)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontFamily: "Montserrat",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    fontSize: "0.9rem",
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

function WalletConnection() {
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { walletState, connectWallet, fetchWalletDetails } = useWalletContext();
  const [manualWalletInfo, setManualWalletInfo] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      handleOpen();
      try {
        await connectWallet();
        await fetchWalletDetails();
        setSnackbar({
          open: true,
          message: "Wallet connected successfully!",
          severity: "success",
        });
        handleClose();
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        setSnackbar({
          open: true,
          message: "Error connecting to MetaMask",
          severity: "error",
        });
        handleClose();
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please install MetaMask!",
        severity: "warning",
      });
    }
  };

  const handleManualEntry = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleFetchDetails = async () => {
    if (!ethers.utils.isAddress(walletAddress)) {
      setSnackbar({
        open: true,
        message: "Invalid Ethereum address",
        severity: "error",
      });
      return;
    }
    handleOpen();
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        import.meta.env.VITE_INFURA_SEPOLIA_ENDPOINT
      );
      const balance = await provider.getBalance(walletAddress);
      const formattedBalance = ethers.utils.formatEther(balance);
      setManualWalletInfo({
        address: walletAddress,
        balance: formattedBalance,
      });
      setSnackbar({
        open: true,
        message: "Wallet details fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      setSnackbar({
        open: true,
        message: "Error fetching wallet details",
        severity: "error",
      });
    } finally {
      handleClose();
    }
  };

  // Ref for the container to apply animations
  const containerRef = useRef(null);
  const theme = useTheme(); // Access theme for responsive styles

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const animateItems = container.querySelectorAll(".animate-item");
      staggerSlideInFromTop(animateItems, 0.2);
    }
  }, []);

  return (
    <StyledBox ref={containerRef}>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          fontFamily: "Poppins",
          color: "#fff",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.8rem",
          },
        }}
        className="animate-item"
      >
        CryptoDocker
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Poppins",
          color: "#fff",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
          },
        }}
        className="animate-item"
      >
        Harbor for All Your Crypto Operations
      </Typography>

      <ResponsiveButton
        variant="contained"
        onClick={connectWalletHandler}
        className="animate-item"
        sx={{
          backgroundColor: "#30C0BF",
          color: "#fff",
          "&:hover": { backgroundColor: "#2AA4A4" },
        }}
        aria-label={walletState.isConnected ? "Wallet Connected" : "Connect Wallet"}
      >
        {walletState.isConnected ? "Wallet Connected" : "Connect Wallet"}
      </ResponsiveButton>

      <Typography
        variant="body1"
        sx={{
          color: "#fff",
          fontFamily: "Poppins",
          marginTop: 1,
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.9rem",
          },
        }}
        className="animate-item"
      >
        OR
      </Typography>

      {/* Responsive Input Field */}
      <ResponsiveTextField
        label="Enter Wallet Address"
        variant="outlined"
        value={walletAddress}
        onChange={handleManualEntry}
        className="animate-item"
        InputProps={{
          placeholder: "0x...",
        }}
        aria-label="Enter Ethereum wallet address"
      />

      <ResponsiveButton
        variant="outlined"
        onClick={handleFetchDetails}
        className="animate-item"
        sx={{
          color: "#fff",
          borderColor: "#fff",
          "&:hover": { borderColor: "#ddd", backgroundColor: "rgba(255, 255, 255, 0.1)" },
        }}
        aria-label="Fetch Wallet Details"
      >
        Fetch Wallet Details
      </ResponsiveButton>

      {/* Display Connected Wallet Information */}
      {walletState.isConnected && (
        <InfoBox className="animate-item">
          <Typography variant="h6" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            Connected Wallet
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            <strong>Address:</strong> {walletState.address}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            <strong>Balance:</strong> {walletState.ethBalance} ETH
          </Typography>
        </InfoBox>
      )}

      {/* Display Manual Wallet Information */}
      {manualWalletInfo && (
        <InfoBox className="animate-item">
          <Typography variant="h6" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            Manual Wallet Information
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            <strong>Address:</strong> {manualWalletInfo.address}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Montserrat", color: "#333" }}>
            <strong>Balance:</strong> {manualWalletInfo.balance} ETH
          </Typography>
        </InfoBox>
      )}

      {/* Modal for Loading State */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="loading-modal"
        aria-describedby="loading-wallet-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: 300 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" id="loading-modal">
            {walletState.isConnected ? "Connecting Wallet..." : "Fetching Wallet Details..."}
          </Typography>
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", maxWidth: "400px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
}

export default WalletConnection;
