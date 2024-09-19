// import {
//     AppBar,
//     Container,
//     MenuItem,
//     Select,
//     Toolbar,
//     Typography,
//     ThemeProvider,
//   } from "@mui/material";
//   import { createTheme } from "@mui/material/styles";
//   import { useNavigate } from "react-router-dom";
//   import { CryptoState } from "../../contexts/CryptoContext";
  
//   const darkTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#fff",
//       },
//       mode: "dark",
//     },
//   });
  
//   function Header() {
//     const { currency, setCurrency } = CryptoState();
//     const navigate = useNavigate(); 
  
//     return (
//       <ThemeProvider theme={darkTheme}>
//         <AppBar color="transparent" position="static">
//           <Container>
//             <Toolbar>
//               <Typography
//                 onClick={() => navigate(`/`)} 
//                 variant="h6"
//               >
//                 CryptoDocker 
//               </Typography>
  
//               <Select
//                 variant="outlined"
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={currency}
//                 style={{ width: 100, height: 40, marginLeft: 15 }}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <MenuItem value={"USD"}>USD</MenuItem>
//                 <MenuItem value={"INR"}>INR</MenuItem>
//               </Select>
//             </Toolbar>
//           </Container>
//         </AppBar>
//       </ThemeProvider>
//     );
//   }
  
//   export default Header;
  


// src/components/Header.jsx

import React from "react";
import { AppBar, Toolbar, Typography, Select, MenuItem, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { CryptoState } from "../../contexts/CryptoContext";

const Header = () => {
  const { currency, setCurrency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flex: 1,
              color: "gold",
              textDecoration: "none",
              fontFamily: "Montserrat",
            }}
          >
            CryptoTracker
          </Typography>
          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
              color: "gold",
            }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"JPY"}>JPY</MenuItem>
            {/* Add more currencies as needed */}
          </Select>
          <Typography
            variant="button"
            component={Link}
            to="/watchlist"
            sx={{
              color: "gold",
              textDecoration: "none",
              fontFamily: "Montserrat",
              marginRight: 2,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            My Watchlist
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
