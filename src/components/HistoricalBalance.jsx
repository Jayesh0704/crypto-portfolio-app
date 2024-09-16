import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' // Use Dayjs adapter
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function HistoricalBalance({ userAddress }) {
  const [tokenAddress, setTokenAddress] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [historicalData, setHistoricalData] = useState([])

  const fetchHistoricalData = async () => {
    // This is a placeholder. You would typically fetch this data from an API
    const mockData = [
      { date: '2023-01-01', balance: 100 },
      { date: '2023-02-01', balance: 150 },
      { date: '2023-03-01', balance: 120 },
      { date: '2023-04-01', balance: 200 },
    ]
    setHistoricalData(mockData)
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Historical Balance</Typography>
      <TextField
        label="Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mr: 2, mb: 2 }} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mr: 2, mb: 2 }} />}
        />
      </LocalizationProvider>
      <Button variant="contained" onClick={fetchHistoricalData}>
        Fetch Historical Data
      </Button>
      {historicalData.length > 0 && (
        <Box sx={{ height: 300, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  )
}

export default HistoricalBalance
