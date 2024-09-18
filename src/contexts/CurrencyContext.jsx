import React, { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
};