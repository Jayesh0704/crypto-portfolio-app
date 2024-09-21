// import React, { useEffect, useRef, useState } from "react";
// import { styled } from "@mui/material/styles";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Container, Typography, LinearProgress, Box, Button } from "@mui/material";
// import parse from "html-react-parser"; 
// import CoinInfo from "./CoinInfo"; 
// import { SingleCoin } from "../../config/api";
// import { numberWithCommas } from "./CoinsTable";
// import { CryptoState } from "../../contexts/CryptoContext";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from "@mui/icons-material/Star";
// import Header from "../Header/Header"; 
// // Import animations from your animations.js file
// import { fadeIn, slideInFromLeft, slideInFromBottom } from "../Animations";


// // Styled Components
// const StyledContainer = styled(Container)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-around",
//   alignItems: "flex-start",
//   marginTop: 20,
//   gap:"150px",
//   padding: "2rem",
//   [theme.breakpoints.down("md")]: {
//     flexDirection: "column",
//     alignItems: "center",
//   }
// }));

// const Sidebar = styled(Box)(({ theme }) => ({
//   width: "40%",
  
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginRight: ".2rem", 
//   [theme.breakpoints.down("md")]: {
//     width: "100%",
//     marginRight: 0,
//     marginBottom: "20px",
//   },
// }));

// const MarketData = styled(Box)(({ theme }) => ({
//   width: "100%",
//   marginTop: "15px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "16px",
//   fontFamily: "Montserrat",
//   color: "#ffffff",
// }));

// const CoinPage = () => {
//   const { id } = useParams();
//   const [coin, setCoin] = useState(null);
//   const {
//     currency,
//     symbol,
//     addToWatchlist,
//     removeFromWatchlist,
//     isInWatchlist,
//   } = CryptoState();

//   // Refs for elements that will be animated
//   const sidebarRef = useRef(null);
//   const marketDataRef = useRef(null);
//   const headerRef = useRef(null);

//   useEffect(() => {
//     const fetchCoin = async () => {
//       const { data } = await axios.get(SingleCoin(id)).catch(error => {
//         console.error("Failed to fetch coin data:", error);
//       });
//       setCoin(data);
//     };

//     fetchCoin();
//   }, [id]);

//   useEffect(() => {
//     // Apply animations using GSAP functions
//     fadeIn(sidebarRef.current); // Fades in the sidebar
//     slideInFromLeft(headerRef.current); // Slides in the header from the left
//     slideInFromBottom(marketDataRef.current); // Slides in market data from the bottom
//   }, [coin]); // Run the animations when coin data is available

//   if (!coin) return <LinearProgress sx={{ backgroundColor: "#30c0bf" }} />;

//   const inWatchlist = isInWatchlist(coin);

//   return (
//     <>
//       <Header ref={headerRef} /> {/* Header animation applied */}
      
//       <StyledContainer>
//         <Sidebar ref={sidebarRef}> {/* Sidebar animation applied */}
//           <img
//             src={coin?.image.large}
//             alt={coin?.name}
//             height="175"
//             style={{ marginBottom: 20 }}
//           />
//           <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2, color: "#30c0bf", fontFamily: "Montserrat" }}>
//             {coin?.name}
//           </Typography>
//           <Button
//             variant="outlined"
//             startIcon={inWatchlist ? <StarIcon /> : <StarBorderIcon />}
//             onClick={() => inWatchlist ? removeFromWatchlist(coin) : addToWatchlist(coin)}
//             sx={{
//               borderColor: "#30c0bf",
//               color: "#fff",
//               boxShadow: "0 0 2px #30c0bf", // Adding glow effect here
//               "&:hover": {
//                 color: "#fff",
//                 boxShadow: "0 0 5px #30c0bf", // Stronger glow on hover
//               },
//               marginBottom: 2,
//               fontFamily: "Montserrat",
//             }}
//           >
//             {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
//           </Button>
//           <Typography variant="h6" sx={{ width: "100%", textAlign: "justify", fontFamily: "Montserrat", color: "#ffffff" }}>
//             {parse(coin?.description.en.split(". ")[0] + ".")}
//           </Typography>
//           <MarketData ref={marketDataRef}> {/* MarketData animation applied */}
//             <Typography variant="h5"><strong>Rank:</strong> {numberWithCommas(coin?.market_cap_rank)}</Typography>
//             <Typography variant="h5"><strong>Current Price:</strong> {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
//             <Typography variant="h5"><strong>Market Cap:</strong> {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
//           </MarketData>
//         </Sidebar>
//         <CoinInfo coin={coin} />
//       </StyledContainer>
//     </>
//   );
// };

// export default CoinPage;


// // src/components/Coin/CoinPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";
import parse from "html-react-parser"; 
import CoinInfo from "./CoinInfo"; 
import { SingleCoin } from "../../config/api";
import { numberWithCommas } from "./CoinsTable";
import { CryptoState } from "../../contexts/CryptoContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Header from "../Header/Header"; 
// Import animations from your animations.js file
import { fadeIn, slideInFromLeft, slideInFromBottom } from "../Animations";

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "50px", // Reduced gap from 150px to 50px
  padding: "2rem",
  maxWidth: "1200px", // Set a max width for larger screens
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    padding: "1rem",
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "35%", // Adjusted width from 40% to 35%
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "90%",
    marginBottom: "20px",
  },
}));

const MarketData = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  fontFamily: "Montserrat",
  color: "#ffffff",
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const {
    currency,
    symbol,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = CryptoState();

  // Refs for elements that will be animated
  const sidebarRef = useRef(null);
  const marketDataRef = useRef(null);
  const headerRef = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    fetchCoin();
  }, [id]);

  useEffect(() => {
    if (coin) {
      // Apply animations using GSAP functions
      fadeIn(sidebarRef.current); // Fades in the sidebar
      slideInFromLeft(headerRef.current); // Slides in the header from the left
      slideInFromBottom(marketDataRef.current); // Slides in market data from the bottom
    }
  }, [coin]); // Run the animations when coin data is available

  if (!coin) return <LinearProgress sx={{ backgroundColor: "#30c0bf" }} />;

  const inWatchlist = isInWatchlist(coin);

  return (
    <>
      <Header ref={headerRef} /> {/* Header animation applied */}
      
      <StyledContainer>
        <Sidebar ref={sidebarRef}> {/* Sidebar animation applied */}
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="150"
            style={{ marginBottom: 20 }}
            loading="lazy" // Added lazy loading
          />
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: "bold", 
              marginBottom: 2, 
              color: "#30c0bf", 
              fontFamily: "Montserrat",
              textAlign: "center",
              wordBreak: "break-word", // Prevent overflow with long names
            }}
          >
            {coin?.name}
          </Typography>
          <Button
            variant="outlined"
            startIcon={inWatchlist ? <StarIcon /> : <StarBorderIcon />}
            onClick={() => inWatchlist ? removeFromWatchlist(coin) : addToWatchlist(coin)}
            sx={{
              borderColor: "#30c0bf",
              color: "#fff",
              boxShadow: "0 0 2px #30c0bf", // Adding glow effect here
              "&:hover": {
                color: "#fff",
                boxShadow: "0 0 5px #30c0bf", // Stronger glow on hover
                backgroundColor: "rgba(48, 192, 191, 0.1)", // Subtle background on hover
              },
              marginBottom: 2,
              fontFamily: "Montserrat",
              width: "100%", // Make button full width within Sidebar
              maxWidth: "300px", // Prevent excessive stretching
            }}
            aria-label={
              inWatchlist
                ? `Remove ${coin.name} from watchlist`
                : `Add ${coin.name} to watchlist`
            }
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
          <Typography 
            variant="h6" 
            sx={{ 
              width: "100%", 
              textAlign: "justify", 
              fontFamily: "Montserrat", 
              color: "#ffffff",
              marginBottom: 2,
              wordBreak: "break-word", // Prevent overflow with long text
            }}
          >
            {parse(
              coin?.description.en
                ? coin.description.en.split(". ")[0] + "."
                : "No description available."
            )}
          </Typography>
          <MarketData ref={marketDataRef}> {/* MarketData animation applied */}
            <Typography variant="h5">
              <strong>Rank:</strong> {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
            <Typography variant="h5">
              <strong>Current Price:</strong> {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
                  ? coin.market_data.current_price[currency.toLowerCase()].toLocaleString()
                  : "N/A"
              )}
            </Typography>
            <Typography variant="h5">
              <strong>Market Cap:</strong> {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  ? (coin.market_data.market_cap[currency.toLowerCase()] / 1e6).toLocaleString()
                  : "N/A"
              )}{" "}
              M
            </Typography>
          
          </MarketData>
        </Sidebar>
        <CoinInfo coin={coin} /> 
      </StyledContainer>
    </>
  );
};

export default CoinPage;
