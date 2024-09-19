// import React, { useState } from 'react'
// import { TextField, Button, Box, Typography } from '@mui/material'
// import { ethers } from 'ethers'

// const ERC20_ABI = [
//   "function allowance(address owner, address spender) view returns (uint256)"
// ]

// function TokenAllowance({ userAddress }) {
//   const [tokenAddress, setTokenAddress] = useState('')
//   const [spenderAddress, setSpenderAddress] = useState('')
//   const [allowance, setAllowance] = useState(null)

//   const checkAllowance = async () => {
//     if (tokenAddress && spenderAddress && userAddress) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
//       const allowance = await contract.allowance(userAddress, spenderAddress)
//       setAllowance(ethers.utils.formatEther(allowance))
//     }
//   }

//   return (
//     <Box sx={{ mb: 2 }}>
//       <Typography variant="h6">Check Token Allowance</Typography>
//       <TextField
//         label="Token Address"
//         value={tokenAddress}
//         onChange={(e) => setTokenAddress(e.target.value)}
//         sx={{ mr: 2, mb: 2 }}
//       />
//       <TextField
//         label="Spender Address"
//         value={spenderAddress}
//         onChange={(e) => setSpenderAddress(e.target.value)}
//         sx={{ mr: 2, mb: 2 }}
//       />
//       <Button variant="contained" onClick={checkAllowance}>
//         Check Allowance
//       </Button>
//       {allowance !== null && (
//         <Typography sx={{ mt: 2 }}>Allowance: {allowance}</Typography>
//       )}
//     </Box>
//   )
// }

// export default TokenAllowance
