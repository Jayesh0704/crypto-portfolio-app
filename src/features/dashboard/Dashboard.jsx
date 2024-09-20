


// // import React from 'react';
// // import { useWalletContext } from '../../contexts/WalletContext';

// // function Dashboard() {
// //     const { walletState, disconnectWallet } = useWalletContext();
// //     const walletAddress = walletState.address;

// //     if (!walletAddress) {
// //         return <div className="text-white text-center p-4">Please connect your wallet.</div>;
// //     }

// //     const truncateAddress = (address) => {
// //         return `${address.slice(0, 6)}...${address.slice(-4)}`;
// //     };

// //     return (
// //         <div className="bg-gray-900 text-white pt-2  flex items-center justify-center min-h-screen ">
// //             <img 
// //                 src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTqO8hDoPisYVZbO2P67W9twto5szKXjKLVD_rCbw9BKAddaHGY" 
// //                 alt="Profile" 
// //                 className="w-20 h-20 rounded-full object-cover max-w-full max-h-full mr-4 pt-12 px-10"
// //                 style={{
// //                     borderRadius: '15%',
// //                     objectFit: 'contain',
// //                     padding:'20px'

// //                 }}
// //             />
// //             <div className="flex-1">
// //                 <div className="text-center">
// //                     <div className="text-sm">
// //                         <span className="font-semibold">{truncateAddress(walletAddress)}</span>
// //                     </div>
// //                     <div className="text-2xl font-bold">$0.00</div>
// //                     <div className="text-green-500 text-sm">+0% ($0.00)</div>
// //                 </div>
// //             </div>
// //             <button
// //                 onClick={disconnectWallet}
// //                 className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-s-md hover:bg-gray-700"
// //             >
// //                 Remove wallet
// //             </button>
// //         </div>
// //     );
// // }

// // export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import HistoricalBalance from '../../components/HistoricalBalance';
// import WalletInfo from '../../features/Wallet/WalletInfo';
// import { useWalletContext } from '../../contexts/WalletContext'; // Import the custom wallet context hook

// function Dashboard() {
//     const { walletState } = useWalletContext(); // Use walletState from WalletContext
//     const walletAddress = walletState.address; // Get the wallet address from the walletState
//     const [balances, setBalances] = useState({});
//     const [loading, setLoading] = useState(true);

//     const fetchBalances = async (address) => {
//         setLoading(true);
//         try {
//             // Simulated API response
//             const response = {
//                 data: {
//                     ETH: { balance: 2.5, price: 3200 },
//                     BTC: { balance: 0.8, price: 47000 }
//                 }
//             };
//             setBalances(response.data);
//         } catch (error) {
//             console.error('Failed to fetch balances:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (walletAddress) {
//             fetchBalances(walletAddress);
//         }
//     }, [walletAddress]);

//     if (!walletAddress) {
//         return <div className="text-center py-10 text-lg text-gray-500">Please connect your wallet.</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
//             <div className="max-w-3xl mx-auto">
//                 <WalletInfo />
//                 <div className="mt-8">
//                     <h2 className="text-2xl font-semibold mb-4 text-center">Token Balances</h2>
//                     {loading ? (
//                         <p className="text-center text-gray-500">Loading balances...</p>
//                     ) : (
//                         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             {Object.entries(balances).map(([token, data]) => (
//                                 <li
//                                     key={token}
//                                     className="p-4 border border-gray-200 rounded-md shadow-sm bg-white text-center"
//                                 >
//                                     <h3 className="text-xl font-semibold">{token}</h3>
//                                     <p className="text-lg">Balance: {data.balance}</p>
//                                     <p className="text-sm text-gray-500">
//                                         Value: USD {(data.balance * data.price).toFixed(2)}
//                                     </p>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <div className="mt-12">
//                     <HistoricalBalance />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import HistoricalBalance from '../../components/HistoricalBalance'; 
import WalletInfo from '../../features/Wallet/WalletInfo'; 
import { useWalletContext } from '../../contexts/WalletContext'; // Import the custom wallet context hook

function Dashboard() {
    const { walletState } = useWalletContext(); // Use walletState from WalletContext
    const walletAddress = walletState.address; // Get the wallet address from the walletState
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);

    
    const fetchBalances = async (address) => {
        setLoading(true);
        try {
            // Simulated API response
            const response = {
                data: {
                    'ETH': { balance: 2.5, price: 3200 },
                    'BTC': { balance: 0.8, price: 47000 }
                }
            };
            setBalances(response.data);
        } catch (error) {
            console.error('Failed to fetch balances:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (walletAddress) {
            fetchBalances(walletAddress);
        }
    }, [walletAddress]);

    if (!walletAddress) {
        return <div>Please connect your wallet.</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <WalletInfo />
         
        </div>
    );
}

export default Dashboard;
