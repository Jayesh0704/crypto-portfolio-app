// // src/components/Coin/CoinPage.jsx
// import { LinearProgress, Typography, Container, Box, styled } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import parse from "html-react-parser"; // Replacing ReactHtmlParser for compatibility with MUI v5
// import CoinInfo from "./CoinInfo";
// import { SingleCoin } from "../../config/api";
// import { numberWithCommas } from "./CoinsTable";
// import { CryptoState } from "../../contexts/CryptoContext";

// // Define styled components using MUI v5 styled API
// const Sidebar = styled(Box)(({ theme }) => ({
//   width: "30%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginTop: 25,
//   borderRight: "2px solid grey",
//   [theme.breakpoints.down("md")]: {
//     width: "100%",
//     borderRight: "none",
//     borderBottom: "2px solid grey",
//     paddingBottom: 20,
//   },
// }));

// const MarketData = styled(Box)(({ theme }) => ({
//   alignSelf: "start",
//   padding: 25,
//   paddingTop: 10,
//   width: "100%",
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px", // Provides consistent spacing between items
// }));

// const CoinPage = () => {
//   const { id } = useParams();
//   const [coin, setCoin] = useState(null);
//   const { currency, symbol } = CryptoState();

//   useEffect(() => {
//     const fetchCoin = async () => {
//       try {
//         const { data } = await axios.get(SingleCoin(id));
//         console.log("Fetched Coin Data:", data);
//         setCoin(data);
//       } catch (error) {
//         console.error("Failed to fetch coin data:", error);
//       }
//     };

//     fetchCoin();
//   }, [id]);

//   if (!coin) return <LinearProgress sx={{ backgroundColor: "#30c0bf" }} />;

//   return (
//     <Container style={{ display: "flex", marginTop: 25 }}>
//       <Sidebar>
//         <img
//           src={coin?.image.large}
//           alt={coin?.name}
//           height="200"
//           style={{ marginBottom: 20 }}
//         />
//         <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat" }}>
//           {coin?.name}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "justify", fontFamily: "Montserrat" }}>
//           {parse(coin?.description.en.split(". ")[0] + ".")}
//         </Typography>
//         <MarketData>
//           <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
//             <strong>Rank:</strong>&nbsp;{numberWithCommas(coin?.market_cap_rank)}
//           </Typography>
//           <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
//             <strong>Current Price:</strong>&nbsp;{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
//           </Typography>
//           <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
//             <strong>Market Cap:</strong>&nbsp;{symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
//           </Typography>
//         </MarketData>
//       </Sidebar>
//       <CoinInfo coin={coin} />
//     </Container>
//   );
// };

// export default CoinPage;








// src/components/Coin/CoinPage.jsx

import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, LinearProgress, Box, Button } from "@mui/material";
import parse from "html-react-parser"; // For parsing HTML descriptions
import CoinInfo from "./CoinInfo";
import { SingleCoin } from "../../config/api";
import { numberWithCommas } from "./CoinsTable";
import { CryptoState } from "../../contexts/CryptoContext";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderRight: "none",
    borderBottom: "2px solid grey",
    paddingBottom: 20,
  },
}));

const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px", // Consistent spacing between items
}));

const CoinPage = () => {
  const { id } = useParams(); // Get the coin ID from URL parameters
  const [coin, setCoin] = useState(null); // State to store coin data
  const { currency, symbol, addToWatchlist, removeFromWatchlist, isInWatchlist } = CryptoState(); // Access context

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id)); // Fetch coin data from API
        console.log("Fetched Coin Data:", data);
        setCoin(data);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />; // Show loader while fetching

  const inWatchlist = isInWatchlist(coin); // Check if the coin is in the watchlist

  // Function to handle adding/removing from watchlist
  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(coin);
    } else {
      addToWatchlist(coin);
    }
  };

  return (
    <Container style={{ display: "flex", marginTop: 25 }}>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2, fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>
        <Button
          variant="outlined"
          startIcon={inWatchlist ? <StarIcon /> : <StarBorderIcon />}
          onClick={handleWatchlistToggle}
          sx={{
            marginBottom: 2,
            borderColor: inWatchlist ? "gold" : "grey",
            color: inWatchlist ? "gold" : "grey",
            "&:hover": {
              borderColor: "gold",
              color: "gold",
            },
            fontFamily: "Montserrat",
          }}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
        <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "justify", fontFamily: "Montserrat" }}>
          {parse(coin?.description.en.split(". ")[0] + ".")}
        </Typography>
        <MarketData>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
            <strong>Rank:</strong>&nbsp;{numberWithCommas(coin?.market_cap_rank)}
          </Typography>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
            <strong>Current Price:</strong>&nbsp;{symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", fontFamily: "Montserrat" }}>
            <strong>Market Cap:</strong>&nbsp;{symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
          </Typography>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
