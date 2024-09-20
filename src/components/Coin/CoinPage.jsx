

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, LinearProgress, Box, Button } from "@mui/material";
import parse from "html-react-parser"; // For parsing HTML descriptions
import CoinInfo from "./CoinInfo"; // Ensure this is the correct import path
import { SingleCoin } from "../../config/api";
import { numberWithCommas } from "./CoinsTable";
import { CryptoState } from "../../contexts/CryptoContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Header from "../Header/Header"; // Ensure Header is properly imported if used

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "flex-start",
  marginTop: 20,
  gap:"150px",
  padding: "2rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  }
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "50%",
  
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: ".2rem", // Increased margin for more space
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginRight: 0,
    marginBottom: "20px",
  },
}));

const MarketData = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "15px",
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

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id)).catch(error => {
        console.error("Failed to fetch coin data:", error);
      });
      setCoin(data);
    };

    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "#30c0bf" }} />;

  const inWatchlist = isInWatchlist(coin);

  return (
    <>
      <Header />
      <StyledContainer>
        <Sidebar>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="175"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2, color: "#30c0bf", fontFamily: "Montserrat" }}>
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
              },
              marginBottom: 2,
              fontFamily: "Montserrat",
            }}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
          <Typography variant="h6"   sx={{ width: "100%", textAlign: "justify", fontFamily: "Montserrat", color: "#ffffff" }}>
            {parse(coin?.description.en.split(". ")[0] + ".")}
          </Typography>
          <MarketData>
            <Typography variant="h5"><strong>Rank:</strong> {numberWithCommas(coin?.market_cap_rank)}</Typography>
            <Typography variant="h5"><strong>Current Price:</strong> {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
            <Typography variant="h5"><strong>Market Cap:</strong> {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
          </MarketData>
        </Sidebar>
        <CoinInfo coin={coin} />
      </StyledContainer>
    </>
  );
};

export default CoinPage;




