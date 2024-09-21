// src/components/Watchlist.jsx

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
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query"; 
import axios from "axios";
import { CoinList } from "../config/api"; 
import { useNavigate } from "react-router-dom"; 
import { CryptoState } from "../contexts/CryptoContext";
import debounce from 'lodash.debounce'; 
import Header from "./Header/Header";

// Utility function to format numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Row = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: "Montserrat",
}));

// Styled Pagination for consistent theming
const PaginationStyled = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "#fff",
  },
}));

const Watchlist = () => {
  // State variables
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Context and navigation hooks
  const { currency, symbol, watchlist, removeFromWatchlist } = CryptoState();
  const navigate = useNavigate(); // Updated to use useNavigate

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

  
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Function to filter coins based on search input and watchlist
  const handleSearch = () => {
    if (!coins) return []; // Ensure coins is defined
    const watchlistCoins = coins.filter(coin => watchlist.includes(coin.id));
    if (!search) return watchlistCoins;
    return watchlistCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Get the filtered coins
  const filteredCoins = handleSearch();

  return (
    <>
    
      <Header />
      <Container sx={{ textAlign: "center", marginTop: { xs: 2, sm: 4 }, mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ margin: { xs: 2, sm: 3 }, fontFamily: "Montserrat", color: "#30c0bf" }}
        >
          My Watchlist
        </Typography>
        {watchlist.length === 0 ? (
          <Typography variant="h6" sx={{ marginTop: 2, fontFamily: "Montserrat" }}>
            Add tokens to your watchlist
          </Typography>
        ) : (
          <>
            <TextField
              label="Search For a Crypto Currency.."
              variant="outlined"
              sx={{
                marginBottom: 4,
                width: { xs: "100%", sm: "50%", md: "40%" },
                backgroundColor: "transparent",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#30c0bf",
                  },
                  "&:hover fieldset": {
                    borderColor: "#30c0bf",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#30c0bf",
                  },
                  color: "#fff",
                },
                "& .MuiInputLabel-root": {
                  color: "#A3A3A2",
                },
              }}
              onChange={(e) => debouncedSearch(e.target.value)}
              InputProps={{
                placeholder: "Search for a cryptocurrency...",
              }}
            />
            <Box sx={{ overflowX: 'auto' }}>
              <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
                {isLoading ? (
                  <LinearProgress sx={{ backgroundColor: "gold" }} />
                ) : isError ? (
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" color="error">
                      {error.response && error.response.status === 429
                        ? "Rate limit exceeded. Please try again later."
                        : "Failed to fetch coins data."}
                    </Typography>
                  </Box>
                ) : filteredCoins.length === 0 ? (
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6">
                      No coins match your search.
                    </Typography>
                  </Box>
                ) : (
                  <Table aria-label="watchlist table">
                    <TableHead>
                      <TableRow>
                        {["COIN", "PRICE", "24H CHANGE", "1Y CHANGE", "MARKET CAP", "REMOVE"].map((head) => (
                          <TableCell
                            key={head}
                            align={head === "COIN" ? "left" : "right"}
                            sx={{
                              color: "#fff",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                              fontSize: { xs: 10, sm: 12, md: 16 },
                            }}
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
                          const profit24h = row.price_change_percentage_24h > 0;
                          const profit1y = row.price_change_percentage_1y_in_currency > 0;

                          return (
                            <Row
                              onClick={() => navigate(`/coins/${row.id}`)}
                              key={row.id} // Unique key
                              className="animate-item"
                              role="button"
                              aria-label={`View details for ${row.name}`}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  navigate(`/coins/${row.id}`);
                                }
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  color: "#ffffff",
                                  fontFamily: "Montserrat",
                                  fontSize: { xs: 10, sm: 12, md: 16 },
                                  alignItems: "center",
                                }}
                              >
                                {/* Coin Image and Name (Hidden on xs) */}
                                <Box
                                  sx={{
                                    display: { xs: "none", sm: "flex" },
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <img
                                    src={row?.image}
                                    alt={`${row.name} logo`}
                                    height={40}
                                    style={{ borderRadius: "50%" }}
                                    loading="lazy"
                                  />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        textTransform: "uppercase",
                                        fontSize: { xs: "0.7rem", sm: ".9rem", md: "1.2rem" },
                                        color: "#fff",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {row.symbol}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "darkgrey",
                                        fontFamily: "Montserrat",
                                        fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                                      }}
                                    >
                                      {row.name}
                                    </Typography>
                                  </Box>
                                </Box>

                                {/* Coin Symbol (Visible on xs) */}
                                <Typography
                                  variant="body1"
                                  sx={{
                                    display: { xs: "block", sm: "none" },
                                    textTransform: "uppercase",
                                    fontSize: { xs: "0.7rem", sm: ".9rem", md: "1.2rem" },
                                    color: "#fff",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {row.symbol}
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ color: "#ffffff", fontFamily: "Montserrat", fontSize: { xs: 8.5, sm: 12, md: 16 } }}
                              >
                                {symbol}{" "}
                                {numberWithCommas(row.current_price.toFixed(2))}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  color: profit24h ? "green" : "red",
                                  fontWeight: 500,
                                  fontFamily: "Montserrat",
                                  fontSize: { xs: 10, sm: 12, md: 16 },
                                }}
                              >
                                {profit24h && "+"}
                                {row.price_change_percentage_24h
                                  ? row.price_change_percentage_24h.toFixed(2)
                                  : "0.00"}%
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  color: profit1y ? "green" : "red",
                                  fontWeight: 500,
                                  fontFamily: "Montserrat",
                                  fontSize: { xs: 12, sm: 14, md: 16 },
                                }}
                              >
                                {profit1y && "+"}
                                {row.price_change_percentage_1y_in_currency
                                  ? row.price_change_percentage_1y_in_currency.toFixed(2)
                                  : "0.00"}%
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ color: "#ffffff", fontFamily: "Montserrat", fontSize: { xs: 8.5, sm: 11, md: 16 } }}
                              >
                                {symbol}{" "}
                                {numberWithCommas(
                                  (row.market_cap / 1e6).toFixed(2)
                                )}
                                M
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    removeFromWatchlist(row.id);
                                  }}
                                  sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                      backgroundColor: "#ff4d4d",
                                    },
                                    fontFamily: "Montserrat",
                                  }}
                                  aria-label={`Remove ${row.name} from watchlist`}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </Row>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Box>

            {filteredCoins.length > 0 && (
              <PaginationStyled
                count={Math.ceil(filteredCoins.length / 10)}
                sx={{
                  padding: 2,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(_, value) => {
                  setPage(value);
                  window.scrollTo({ top: 450, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Watchlist;
