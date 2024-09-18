import React, { useState, useEffect } from 'react';

function TokenModal({ onClose, onAddToken }) {
    const [availableTokens, setAvailableTokens] = useState([]);

    useEffect(() => {
        // Fetch tokens from an API and update state
        fetch('/api/tokens')
            .then(response => response.json())
            .then(data => setAvailableTokens(data.tokens))
            .catch(error => console.error('Failed to fetch tokens', error));
    }, []);

    return (
        <div className="modal">
            <button onClick={onClose}>Close</button>
            {availableTokens.map(token => (
                <div key={token.address} onClick={() => onAddToken(token)}>
                    {token.name}
                </div>
            ))}
        </div>
    );
}

export default TokenModal;
