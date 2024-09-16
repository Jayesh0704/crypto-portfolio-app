import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { ethers } from 'ethers'

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)"
]

function TokenBalance({ tokenAddress, userAddress }) {
  const [balance, setBalance] = useState(null)
  const [symbol, setSymbol] = useState('')

  useEffect(() => {
    const fetchBalance = async () => {
      if (tokenAddress && userAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
        const balance = await contract.balanceOf(userAddress)
        const symbol = await contract.symbol()
        setBalance(ethers.utils.formatEther(balance))
        setSymbol(symbol)
      }
    }
    fetchBalance()
  }, [tokenAddress, userAddress])

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{symbol} Balance</Typography>
        <Typography>{balance !== null ? `${balance} ${symbol}` : 'Loading...'}</Typography>
      </CardContent>
    </Card>
  )
}

export default TokenBalance