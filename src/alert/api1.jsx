// src/api.js
import axios from 'axios';

export const fetchCurrentPrice = async (cryptoId) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
        return response.data[cryptoId].usd; // Adjust this based on your API response
    } catch (error) {
        console.error('Error fetching price:', error);
        throw error; // Propagate the error
    }
};
