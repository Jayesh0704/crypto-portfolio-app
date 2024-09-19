import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    ThemeProvider,
  } from "@mui/material";
  import { createTheme } from "@mui/material/styles";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../../contexts/CryptoContext";
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  
  function Header() {
    const { currency, setCurrency } = CryptoState();
    const navigate = useNavigate(); 
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate(`/`)} 
                variant="h6"
              >
                CryptoDocker 
              </Typography>
  
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;
  