import React, { useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import WalletConnection from './components/WalletConnection'
import WatchList from './components/WatchList'
import TokenBalance from './components/TokenBalance'
import TokenAllowance from './components/TokenAllowance'
import TokenTransfer from './components/TokenTransfer'
import HistoricalBalance from './components/HistoricalBalance'

function App() {
  const [address, setAddress] = useState('')
  const [watchList, setWatchList] = useState([])

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crypto-Portfolio App
        </Typography>
        <WalletConnection setAddress={setAddress} />
        <WatchList watchList={watchList} setWatchList={setWatchList} />
        {watchList.map((token) => (
          <TokenBalance key={token} tokenAddress={token} userAddress={address} />
        ))}
        <TokenAllowance userAddress={address} />
        <TokenTransfer userAddress={address} />
        <HistoricalBalance userAddress={address} />
      </Box>
    </Container>
  )
}

export default App