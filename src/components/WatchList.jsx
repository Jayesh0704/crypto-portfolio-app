import React, { useState } from 'react'
import { TextField, Button, List, ListItem, ListItemText, Box, Typography } from '@mui/material'
import { ethers } from 'ethers'

function WatchList({ watchList, setWatchList }) {
  const [newToken, setNewToken] = useState('')

  const handleAddToken = (e) => {
    e.preventDefault()
    if (ethers.utils.isAddress(newToken) && !watchList.includes(newToken)) {
      setWatchList([...watchList, newToken])
      setNewToken('')
    } else {
      alert('Invalid or duplicate token address')
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Watch List</Typography>
      <Box component="form" onSubmit={handleAddToken} sx={{ mb: 2 }}>
        <TextField
          label="Token Address"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">
          Add Token
        </Button>
      </Box>
      <List>
        {watchList.map((token) => (
          <ListItem key={token}>
            <ListItemText primary={token} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default WatchList