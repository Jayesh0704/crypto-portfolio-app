import React, { useState } from 'react'
import { Button, TextField, Box, Typography } from '@mui/material'
import { ethers } from 'ethers'

function WalletConnection({ setAddress }) {
  const [inputAddress, setInputAddress] = useState('')

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }
  }

  const handleAddressInput = (e) => {
    e.preventDefault()
    if (ethers.utils.isAddress(inputAddress)) {
      setAddress(inputAddress)
    } else {
      alert('Invalid Ethereum address')
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Wallet Connection</Typography>
      <Button variant="contained" onClick={connectWallet} sx={{ mr: 2 }}>
        Connect Wallet
      </Button>
      <Box component="form" onSubmit={handleAddressInput} sx={{ mt: 2 }}>
        <TextField
          label="Ethereum Address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="outlined">
          Set Address
        </Button>
      </Box>
    </Box>
  )
}

export default WalletConnection