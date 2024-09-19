// import React, { useState } from 'react'
// import { TextField, Button, Box, Typography } from '@mui/material'
// import { ethers } from 'ethers'

// const ERC20_ABI = [
//   "function transfer(address to, uint256 amount) returns (bool)"
// ]

// function TokenTransfer({ userAddress }) {
//   const [tokenAddress, setTokenAddress] = useState('')
//   const [recipientAddress, setRecipientAddress] = useState('')
//   const [amount, setAmount] = useState('')

//   const handleTransfer = async () => {
//     if (tokenAddress && recipientAddress && amount) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const signer = provider.getSigner()
//         const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
//         const transaction = await contract.transfer(recipientAddress, ethers.utils.parseEther(amount))
//         await transaction.wait()
//         alert('Transfer successful!')
//       } catch (error) {
//         console.error('Transfer failed:', error)
//         alert('Transfer failed. Check console for details.')
//       }
//     }
//   }

//   return (
//     <Box sx={{ mb: 2 }}>
//       <Typography variant="h6">Token Transfer</Typography>
//       <TextField
//         label="Token Address"
//         value={tokenAddress}
//         onChange={(e) => setTokenAddress(e.target.value)}
//         sx={{ mr: 2, mb: 2 }}
//       />
//       <TextField
//         label="Recipient Address"
//         value={recipientAddress}
//         onChange={(e) => setRecipientAddress(e.target.value)}
//         sx={{ mr: 2, mb: 2 }}
//       />
//       <TextField
//         label="Amount"
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         sx={{ mr: 2, mb: 2 }}
//       />
//       <Button variant="contained" onClick={handleTransfer}>
//         Transfer
//       </Button>
//     </Box>
//   )
// }

// export default TokenTransfer