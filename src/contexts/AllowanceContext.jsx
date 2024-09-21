// src/contexts/AllowanceContext.jsx

import React, { createContext, useContext } from 'react';
import { ethers } from 'ethers';
import ERC20ABI from '../abis/ERC20ABI';
import { useWalletContext } from './WalletContext';

const AllowanceContext = createContext();

/**
 * @dev AllowanceProvider manages the ERC20 allowance interactions.
 */
export const AllowanceProvider = ({ children }) => {
    const { provider, walletState, signer } = useWalletContext();
    
    // Updated to the new ERC20 contract address
    const ERC20_CONTRACT_ADDRESS = '0x8F582fB8b512C14B10E30063D2b86296840447e9'; 

    /**
     * @dev Checks the allowance of a spender by the owner.
     * @param {string} owner - The address of the token owner.
     * @param {string} spender - The address of the spender.
     * @returns {Promise<string>} - The allowance amount formatted as a string.
     */
    const checkAllowance = async (owner, spender) => {
        if (!provider) {
            throw new Error('No provider available. Please connect your wallet.');
        }

        // Validate the contract address
        if (!ethers.utils.isAddress(ERC20_CONTRACT_ADDRESS)) {
            throw new Error('Invalid ERC20 contract address.');
        }

        // Validate owner and spender addresses
        if (!ethers.utils.isAddress(owner)) {
            throw new Error('Invalid owner address.');
        }

        if (!ethers.utils.isAddress(spender)) {
            throw new Error('Invalid spender address.');
        }

        try {
            // Initialize the contract
            const contract = new ethers.Contract(ERC20_CONTRACT_ADDRESS, ERC20ABI, provider);

            // Call the allowance function
            const allowance = await contract.allowance(owner, spender);

            // Fetch decimals to format the allowance correctly
            const decimals = await contract.decimals();

            // Format the allowance using the token's decimals
            const formattedAllowance = ethers.utils.formatUnits(allowance, decimals);

            console.log(`Allowance fetched: ${formattedAllowance} MTK`);

            return formattedAllowance;
        } catch (error) {
            console.error('Error in checkAllowance:', error);

            // Provide a more descriptive error message
            if (error.code === 'CALL_EXCEPTION') {
                throw new Error('Contract call failed. Please ensure the contract address and function are correct.');
            } else {
                throw new Error('An unexpected error occurred while checking allowance.');
            }
        }
    };

    /**
     * @dev Approves a spender to spend a certain amount of tokens on behalf of the owner.
     * @param {string} spender - The address of the spender.
     * @param {string} amount - The amount of tokens to approve (as string).
     * @returns {Promise<ethers.providers.TransactionResponse>} - The transaction response.
     */
    const approveAllowance = async (spender, amount) => {
        if (!signer) {
            throw new Error('No signer available. Please connect your wallet.');
        }

        // Validate the contract address
        if (!ethers.utils.isAddress(ERC20_CONTRACT_ADDRESS)) {
            throw new Error('Invalid ERC20 contract address.');
        }

        // Validate spender address
        if (!ethers.utils.isAddress(spender)) {
            throw new Error('Invalid spender address.');
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            throw new Error('Invalid amount.');
        }

        try {
           
            const contract = new ethers.Contract(ERC20_CONTRACT_ADDRESS, ERC20ABI, signer);

            
            const decimals = await contract.decimals();
            const amountInWei = ethers.utils.parseUnits(amount.toString(), decimals);

            console.log(`Approving ${amount} MTK (${amountInWei.toString()}) for spender: ${spender}`);

            // Call the approve function
            const tx = await contract.approve(spender, amountInWei);
            console.log(`Approval transaction sent: ${tx.hash}`);

            return tx;
        } catch (error) {
            console.error('Error in approveAllowance:', error);
            throw new Error(error.message || 'Failed to approve allowance.');
        }
    };

    return (
        <AllowanceContext.Provider value={{ checkAllowance, approveAllowance }}>
            {children}
        </AllowanceContext.Provider>
    );
};

export const useAllowanceContext = () => {
    return useContext(AllowanceContext);
};
