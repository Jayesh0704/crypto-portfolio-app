// // src/components/Coin/CoinInfo.jsx

// import axios from "axios";
// import { useState, useRef } from "react";
// import { useEffect } from "react";
// import { HistoricalChart } from "../../config/api";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { CircularProgress, styled, Typography, Box } from "@mui/material";
// import SelectButton from "../SelectButton";
// import { chartDays } from "../../config/data";
// import { CryptoState } from "../../contexts/CryptoContext";
// import { useQuery } from "@tanstack/react-query"; // Updated import for React Query v5

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Styled Container
// const Container = styled('div')(({ theme }) => ({
//   width: "75%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 25,
//   padding: 40,
//   [theme.breakpoints.down("md")]: {
//     width: "100%",
//     marginTop: 0,
//     padding: 20,
//     paddingTop: 0,
//   },
// }));

// const CoinInfo = ({ coin }) => {
//   const [days, setDays] = useState(1);
//   const { currency } = CryptoState();

//   // React Query to fetch historical data with caching
//   const { data: historicData, isLoading, isError, error } = useQuery({
//     queryKey: ['historicalData', coin.id, days, currency],
//     queryFn: () => axios.get(HistoricalChart(coin.id, days, currency)).then(res => res.data.prices),
//     staleTime: 10 * 60 * 1000, // 10 minutes
//     cacheTime: 30 * 60 * 1000, // 30 minutes
//     retry: 1, // Retry once on failure
//   });

//   // Handle API rate limit errors
//   if (isError) {
//     return (
//       <Container>
//         <Typography variant="h6" color="error">
//           {error.response && error.response.status === 429
//             ? "Rate limit exceeded. Please try again later."
//             : "Failed to load historical data."}
//         </Typography>
//       </Container>
//     );
//   }

//   if (isLoading) {
//     return (
//       <Container>
//         <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Line
//         key={`${coin.id}-${days}-${currency}`} // Ensures remount on dependency change
//         data={{
//           labels: historicData.map((dataPoint) => {
//             let date = new Date(dataPoint[0]);
//             let time =
//               date.getHours() > 12
//                 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//                 : `${date.getHours()}:${date.getMinutes()} AM`;
//             return days === 1 ? time : date.toLocaleDateString();
//           }),
//           datasets: [
//             {
//               data: historicData.map((dataPoint) => dataPoint[1]),
//               label: `Price ( Past ${days} Days ) in ${currency}`,
//               borderColor: "#EEBC1D",
//             },
//           ],
//         }}
//         options={{
//           elements: {
//             point: {
//               radius: 1,
//             },
//           },
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           scales: {
//             x: {
//               type: 'category', // Ensure 'category' scale is registered
//               labels: historicData.map((dataPoint) => {
//                 let date = new Date(dataPoint[0]);
//                 let time =
//                   date.getHours() > 12
//                     ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//                     : `${date.getHours()}:${date.getMinutes()} AM`;
//                 return days === 1 ? time : date.toLocaleDateString();
//               }),
//             },
//             y: {
//               beginAtZero: true,
//             },
//           },
//         }}
//       />
//       <Box
//         sx={{
//           display: "flex",
//           marginTop: 2,
//           justifyContent: "space-around",
//           width: "100%",
//         }}
//       >
//         {chartDays.map((day) => (
//           <SelectButton
//             key={day.value}
//             onClick={() => setDays(day.value)}
//             selected={day.value === days}
//           >
//             {day.label}
//           </SelectButton>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default CoinInfo;
// src/components/Coin/CoinInfo.jsx

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { HistoricalChartRange } from "../../config/api";
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
import { CircularProgress, styled, Typography, Box, TextField, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CryptoState } from "../../contexts/CryptoContext";
import { useQuery } from "@tanstack/react-query";

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
  backgroundColor: "#1e1e1e",
  borderRadius: 10,
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
}));

const Controls = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 20,
  marginTop: 20,
  flexWrap: "wrap",
  justifyContent: "center",
}));

const CoinInfo = ({ coin }) => {
  // User-selected dates
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 90))); // Default to 3 months ago
  const [endDate, setEndDate] = useState(new Date());

  // Dates used for fetching data
  const [fetchStartDate, setFetchStartDate] = useState(startDate);
  const [fetchEndDate, setFetchEndDate] = useState(endDate);

  const { currency, symbol } = CryptoState(); // Destructure symbol

  // Calculate Unix timestamps
  const calculateUnixTimestamp = (date) => Math.floor(date.getTime() / 1000);

  const from = useMemo(() => calculateUnixTimestamp(fetchStartDate), [fetchStartDate]);
  const to = useMemo(() => calculateUnixTimestamp(fetchEndDate), [fetchEndDate]);

  // Calculate the number of days between fetchStartDate and fetchEndDate
  const calculateDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays(fetchStartDate, fetchEndDate);

  // React Query to fetch historical data with caching
  const { data: historicData, isLoading, isError, error } = useQuery({
    queryKey: ['historicalData', coin.id, from, to, currency],
    queryFn: () => axios.get(HistoricalChartRange(coin.id, from, to, currency)).then(res => res.data.prices),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 1, // Retry once on failure
    enabled: days > 0 && Boolean(fetchStartDate) && Boolean(fetchEndDate), // Ensure boolean
  });

  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    if (!historicData) return {};
    return {
      labels: historicData.map((dataPoint) => {
        let date = new Date(dataPoint[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes().toString().padStart(2, '0')} PM`
            : `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} AM`;
        return days <= 30 ? time : date.toLocaleDateString();
      }),
      datasets: [
        {
          data: historicData.map((dataPoint) => dataPoint[1]),
          label: `Price (Past ${days} Days) in ${currency}`,
          borderColor: "#30c0bf",
          backgroundColor: "rgba(48, 192, 191, 0.5)",
          pointRadius: 0,
          fill: true,
        },
      ],
    };
  }, [historicData, days, currency]);

  // Memoize chart options to prevent unnecessary recalculations
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${symbol} ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          maxTicksLimit: 10,
          color: "#ffffff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: "#ffffff",
          callback: function(value) {
            return `${symbol} ${value}`;
          }
        },
        grid: {
          color: "#444444",
        },
      },
    },
  }), [symbol]);

  return (
    <Container>
      {/* Conditionally Render Loading and Error States */}
      {isLoading ? (
        <CircularProgress style={{ color: "#30c0bf" }} size={250} thickness={1} />
      ) : isError ? (
        <Typography variant="h6" color="error">
          {error.response && error.response.status === 429
            ? "Rate limit exceeded. Please try again later."
            : "Failed to load historical data."}
        </Typography>
      ) : (
        <>
          {/* Chart */}
          <ChartContainer>
            <Line
              key={`${coin.id}-${from}-${to}-${currency}`} // Ensures remount on dependency change
              data={chartData}
              options={chartOptions}
            />
          </ChartContainer>

          {/* Date Pickers and Update Button */}
          <Controls>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                maxDate={endDate}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                maxDate={new Date()}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (calculateDays(startDate, endDate) > 0) {
                  setFetchStartDate(startDate);
                  setFetchEndDate(endDate);
                } else {
                  alert("End date must be after start date.");
                }
              }}
              sx={{
                height: '56px',
                fontFamily: "Montserrat",
                backgroundColor: "#30c0bf",
                '&:hover': {
                  backgroundColor: "#1daaa1",
                },
              }}
            >
              Update Chart
            </Button>
          </Controls>
        </>
      )}
    </Container>
  );
};

export default CoinInfo;
