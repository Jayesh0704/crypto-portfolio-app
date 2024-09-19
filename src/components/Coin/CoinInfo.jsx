// src/components/Coin/CoinInfo.jsx

import axios from "axios";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { HistoricalChart } from "../../config/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CircularProgress, styled, Typography, Box } from "@mui/material";
import SelectButton from "../SelectButton";
import { chartDays } from "../../config/data";
import { CryptoState } from "../../contexts/CryptoContext";
import { useQuery } from "@tanstack/react-query"; // Updated import for React Query v5

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Styled Container
const Container = styled('div')(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const CoinInfo = ({ coin }) => {
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  // React Query to fetch historical data with caching
  const { data: historicData, isLoading, isError, error } = useQuery({
    queryKey: ['historicalData', coin.id, days, currency],
    queryFn: () => axios.get(HistoricalChart(coin.id, days, currency)).then(res => res.data.prices),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 1, // Retry once on failure
  });

  // Handle API rate limit errors
  if (isError) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error.response && error.response.status === 429
            ? "Rate limit exceeded. Please try again later."
            : "Failed to load historical data."}
        </Typography>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      </Container>
    );
  }

  return (
    <Container>
      <Line
        key={`${coin.id}-${days}-${currency}`} // Ensures remount on dependency change
        data={{
          labels: historicData.map((dataPoint) => {
            let date = new Date(dataPoint[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicData.map((dataPoint) => dataPoint[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: 'category', // Ensure 'category' scale is registered
              labels: historicData.map((dataPoint) => {
                let date = new Date(dataPoint[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          marginTop: 2,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => setDays(day.value)}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </Box>
    </Container>
  );
};

export default CoinInfo;
