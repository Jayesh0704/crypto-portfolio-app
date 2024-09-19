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
import { useQuery } from "@tanstack/react-query"; // React Query v5
import axios from "axios";
import { CoinList } from "../config/api"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom"; // Replacing useHistory with useNavigate
import { CryptoState } from "../contexts/CryptoContext";
import debounce from 'lodash.debounce'; // Import debounce

// Utility function to format numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Styled TableRow for better UI
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
    color: "gold",
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

  // Clean up the debounce on component unmount
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
    <Container style={{ textAlign: "center", marginTop: 25 }}>
      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
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
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => debouncedSearch(e.target.value)} // Use debounced function
          />
          <TableContainer component={Paper}>
            {isLoading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
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
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#30c0bf" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap", "Remove"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
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
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <Row
                          onClick={() => navigate(`/coins/${row.id}`)}
                          key={row.id} // Unique key
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
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
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                removeFromWatchlist(row);
                              }}
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

          {filteredCoins.length > 0 && (
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
        </>
      )}
    </Container>
  );
};

export default Watchlist;
