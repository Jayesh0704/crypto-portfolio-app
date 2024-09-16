// import { http, createConfig } from 'wagmi'
// import { mainnet, polygon, arbitrum } from 'wagmi/chains'
// import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// const projectId = '41af8187f146429cbeea6f267f1b7891' // Your WalletConnect project ID

// export const config = createConfig({
//   chains: [mainnet, polygon, arbitrum],
//   connectors: [
//     injected({
//       shimDisconnect: true,
//     }),
//     metaMask({
//       shimDisconnect: true,
//     }),
//     walletConnect({
//       projectId,
//       showQrModal: true,
//     }),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [polygon.id]: http(),
//     [arbitrum.id]: http(),
//   },
// })