// src/components/Carousel.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../contexts/CryptoContext";
import { numberWithCommas } from "../Coin/CoinsTable";
import "react-alice-carousel/lib/alice-carousel.css";

const CarouselContainer = styled('div')(({ theme }) => ({
  height: "400px", // Adjust as needed
  display: "flex",
  
  alignItems: "center",
  width: "100%",
}));

const CarouselItem = styled(Link)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  textDecoration: "none",
  padding: "10px",
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error('Failed to fetch trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <CarouselItem to={`/coins/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1200} 
        animationDuration={800}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlayStrategy="none" 
        disableAutoPlayOnHover={false} 

        items={items}
        autoPlay
        
        controlsStrategy="alternate"
        paddingLeft={20}
        paddingRight={20}
      />
    </CarouselContainer>
  );
};

export default Carousel;
