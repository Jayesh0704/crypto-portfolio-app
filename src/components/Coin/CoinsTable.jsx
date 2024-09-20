
// src/components/CoinsTable.jsx

import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Pagination from "@mui/material/Pagination";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CoinList } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../contexts/CryptoContext";
import debounce from 'lodash.debounce';

// Utility function to format numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Styled TableRow for better UI
const Row = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#1e1e1e",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#2a2a2a",
  },
  fontFamily: "Montserrat",
}));

// Styled Pagination for consistent theming
const PaginationStyled = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "#30c0bf",
  },
}));

export default function CoinsTable() {
  
  // State variables
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Context and navigation hooks
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  // React Query to fetch coins data
  const { data: coins, isLoading, isError, error } = useQuery({
    queryKey: ['coins', currency],
    queryFn: () => axios.get(CoinList(currency)).then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Retry once on failure
  });

  // Reference to store the debounced function
  const debouncedSearch = useRef(
    debounce((value) => {
      setSearch(value);
      setPage(1); // Reset to first page on new search
    }, 300) // 300ms debounce delay
  ).current;

  // Clean up the debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Function to filter coins based on search input
  const handleSearch = () => {
    if (!coins) return []; // Ensure coins is defined
    if (!search) return coins;
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Get the filtered coins
  const filteredCoins = handleSearch();

  return (
    <Container style={{ textAlign: "center", color: "#ffffff" }}>
      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat", color: "#30c0bf" }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Cryptocurrency.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%", backgroundColor: "#2a2a2a", borderRadius: 5, color:"#fff" }}
        onChange={(e) => debouncedSearch(e.target.value)}
      
      />
      <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
        {isLoading ? (
          <LinearProgress style={{ backgroundColor: "#30c0bf" }} />
        ) : isError ? (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" color="error">
              {error.response && error.response.status === 429
                ? "Rate limit exceeded. Please try again later."
                : "Failed to fetch coins data."}
            </Typography>
          </Box>
        ) : (
          <Table aria-label="cryptocurrency table">
            <TableHead>
              <TableRow>
                {["COIN", "PRICE", "24H CHANGE", "30D CHANGE", "1Y CHANGE", "MARKET CAP"].map((head) => (
                  <TableCell
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCoins
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit24h = row.price_change_percentage_24h_in_currency > 0;
                  const profit30d = row.price_change_percentage_30d_in_currency > 0;
                  const profit1y = row.price_change_percentage_1y_in_currency > 0;

                  return (
                    <Row
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.id} // Use unique key
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                          color: "#ffffff",
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                              color: "#fff",
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey", fontFamily: "Montserrat" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#ffffff", fontFamily: "Montserrat" }}>
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit24h ? "green" : "red",
                          fontWeight: 500,
                          fontFamily: "Montserrat",
                        }}
                      >
                        {profit24h && "+"}
                        {row.price_change_percentage_24h_in_currency
                          ? row.price_change_percentage_24h_in_currency.toFixed(2)
                          : "0.00"}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit30d ? "green" : "red",
                          fontWeight: 500,
                          fontFamily: "Montserrat",
                        }}
                      >
                        {profit30d && "+"}
                        {row.price_change_percentage_30d_in_currency
                          ? row.price_change_percentage_30d_in_currency.toFixed(2)
                          : "0.00"}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit1y ? "green" : "red",
                          fontWeight: 500,
                          fontFamily: "Montserrat",
                        }}
                      >
                        {profit1y && "+"}
                        {row.price_change_percentage_1y_in_currency
                          ? row.price_change_percentage_1y_in_currency.toFixed(2)
                          : "0.00"}%
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#ffffff", fontFamily: "Montserrat" }}>
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </Row>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {!isLoading && !isError && (
        <PaginationStyled
          count={Math.ceil(filteredCoins.length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      )}
    </Container>
  );
}


