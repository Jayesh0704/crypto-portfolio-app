import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HistoricalBalance from '../../components/HistoricalBalance'; // Update path as needed

function Dashboard() {
    const walletAddress = useSelector(state => state.wallet.address);
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);

    // Simulated fetch function to get token balances (replace with real API calls)
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
            <div>
                <h2>Token Balances</h2>
                {loading ? (
                    <p>Loading balances...</p>
                ) : (
                    <ul>
                        {Object.entries(balances).map(([token, data]) => (
                            <li key={token}>
                                {token}: {data.balance} (USD {data.balance * data.price})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h2>Historical Data</h2>
                <HistoricalBalance />
            </div>
        </div>
    );
}

export default Dashboard;
