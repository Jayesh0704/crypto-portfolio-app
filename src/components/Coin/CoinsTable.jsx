// src/components/Coin/CoinsTable.jsx

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
import Header from "../Header/Header";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import Locomotive Scroll CSS

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

  // Locomotive Scroll setup
  const scrollRef = useRef(null);
  const locomotiveRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Initialize Locomotive Scroll
      locomotiveRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });

      // Update Locomotive Scroll on window resize
      const handleResize = () => {
        if (locomotiveRef.current) locomotiveRef.current.update();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (locomotiveRef.current) locomotiveRef.current.destroy();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
     
      {/* Scroll Container */}
      <Box
        data-scroll-container
        ref={scrollRef}
        sx={{ 
          minHeight: "100vh", 
          paddingTop: "6", // Adjust based on Header's height
          paddingBottom: 4,
          backgroundColor: "#121212", 
          color: "#ffffff" 
        }}
      >
         <Header />
        <Container sx={{ textAlign: "center", mt: 1 }}>
          <Typography
            variant="h4"
            sx={{ 
              margin: 3, 
              fontFamily: "Montserrat", 
              color: "#30c0bf",
              fontSize: { xs: '1.5rem', sm: '2rem' } 
            }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search For a Cryptocurrency.."
            variant="outlined"
            sx={{
              marginBottom: 4,
              width: { xs: "100%", sm: "50%", md: "40%" },
              backgroundColor: "#2a2a2a",
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
                color: "#fff",
              },
            }}
            onChange={(e) => debouncedSearch(e.target.value)}
            InputProps={{
              placeholder: "Search for a cryptocurrency...",
            }}
          />
          {/* Table */}
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ backgroundColor: "#1e1e1e" }}>
              {isLoading ? (
                <LinearProgress sx={{ backgroundColor: "#30c0bf" }} />
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
                          key={head}
                          align={head === "COIN" ? "left" : "right"}
                          sx={{
                            color: "#fff",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            fontSize: { xs: 10, sm: 12, md: 16 },
                            // Conditionally hide 30D and 1Y CHANGE on small devices
                            ...(head === "30D CHANGE" || head === "1Y CHANGE" ? {
                              display: { xs: 'none', sm: 'table-cell' }
                            } : {})
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
                        const profit24h = row.price_change_percentage_24h_in_currency > 0;
                        const profit30d = row.price_change_percentage_30d_in_currency > 0;
                        const profit1y = row.price_change_percentage_1y_in_currency > 0;

                        return (
                          <Row
                            onClick={() => navigate(`/coins/${row.id}`)}
                            key={row.id} // Use unique key
                            className="animate-item"
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
                                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
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
                              {row.price_change_percentage_24h_in_currency
                                ? row.price_change_percentage_24h_in_currency.toFixed(2)
                                : "0.00"}%
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: profit30d ? "green" : "red",
                                fontWeight: 500,
                                fontFamily: "Montserrat",
                                fontSize: { xs: 10, sm: 12, md: 16 },
                                display: { xs: 'none', sm: 'table-cell' }, // Hide on small devices
                              }}
                            >
                              {profit30d && "+"}
                              {row.price_change_percentage_30d_in_currency
                                ? row.price_change_percentage_30d_in_currency.toFixed(2)
                                : "0.00"}%
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: profit1y ? "green" : "red",
                                fontWeight: 500,
                                fontFamily: "Montserrat",
                                fontSize: { xs: 10, sm: 12, md: 16 },
                                display: { xs: 'none', sm: 'table-cell' }, // Hide on small devices
                              }}
                            >
                              {profit1y && "+"}
                              {row.price_change_percentage_1y_in_currency
                                ? row.price_change_percentage_1y_in_currency.toFixed(2)
                                : "0.00"}%
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#ffffff", fontFamily: "Montserrat", fontSize: { xs: 8.5, sm: 11, md: 16 } }}>
                              {symbol}{" "}
                              {numberWithCommas(
                                (row.market_cap / 1e6).toFixed(2)
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
          </Box>
        </Container>

        {/* Pagination */}
        {!isLoading && !isError && (
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
              // Scroll to top of the table using Locomotive Scroll
              if (locomotiveRef.current) {
                locomotiveRef.current.scrollTo(scrollRef.current, {
                  offset: 0,
                  duration: 800,
                  easing: [0.25, 0.0, 0.35, 1.0],
                });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        )}
      </Box>
    </>
  );
}
