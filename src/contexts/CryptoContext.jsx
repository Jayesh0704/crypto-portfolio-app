// import React, { createContext, useContext, useEffect, useState } from "react";

// const Crypto = createContext();

// const CryptoContext = ({ children }) => {
//   const [currency, setCurrency] = useState("INR");
//   const [symbol, setSymbol] = useState("₹");

//   useEffect(() => {
//     if (currency === "INR") setSymbol("₹");
//     else if (currency === "USD") setSymbol("$");
//   }, [currency]);

//   return (
//     <Crypto.Provider value={{ currency, setCurrency, symbol }}>
//       {children}
//     </Crypto.Provider>
//   );
// };

// export default CryptoContext;

// export const CryptoState = () => {
//   return useContext(Crypto);
// };

// src/contexts/CryptoContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

// Create the Crypto context
const Crypto = createContext();

// Custom hook to use the Crypto context
export const CryptoState = () => {
  return useContext(Crypto);
};

// CryptoProvider component to wrap around the app
export const CryptoContext = ({ children }) => {
  // State for selected currency (e.g., USD, EUR)
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  // State for the watchlist (array of coin IDs)
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when the component mounts
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Function to add a coin to the watchlist
  const addToWatchlist = (coin) => {
    setWatchlist((prev) => {
      if (!prev.includes(coin.id)) {
        return [...prev, coin.id];
      }
      return prev;
    });
  };

  // Function to remove a coin from the watchlist
  const removeFromWatchlist = (coin) => {
    setWatchlist((prev) => prev.filter((id) => id !== coin.id));
  };

  // Function to check if a coin is in the watchlist
  const isInWatchlist = (coin) => {
    return watchlist.includes(coin.id);
  };

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        setSymbol,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;