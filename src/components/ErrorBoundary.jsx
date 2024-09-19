
// src/components/ErrorBoundary.jsx
import React from "react";
import { Typography, Box } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h4" color="error">
            Something went wrong.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
