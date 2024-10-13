import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { init, send } from '@emailjs/browser';

export const PriceAlertForm = () => {
    const [cryptoId, setCryptoId] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [alertType, setAlertType] = useState('above');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        init('9ObP0X9ik9rlKTRxV'); // Replace with your actual user ID
        fetchCoins();
    }, []);

    const fetchCoins = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            setCoins(response.data);
        } catch (error) {
            console.error("Error fetching coins:", error);
            setError("Error fetching cryptocurrencies.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentPrice = async (cryptoId) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
            return response.data[cryptoId]?.usd || 0;
        } catch (error) {
            console.error("Error fetching current price:", error);
            return 0;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!cryptoId) {
            setError('Please select a cryptocurrency.');
            setIsSubmitting(false);
            return;
        }

        if (parseFloat(targetPrice) <= 0) {
            setError('Target price must be a positive number');
            setIsSubmitting(false);
            return;
        }

        const currentPrice = await fetchCurrentPrice(cryptoId);
        
        if (currentPrice === 0) {
            setError('Could not fetch current price. Please try again.');
            setIsSubmitting(false);
            return;
        }

        if ((alertType === 'above' && currentPrice < targetPrice) || 
            (alertType === 'below' && currentPrice > targetPrice)) {
            setError(`Current price is $${currentPrice}, which does not meet your alert condition.`);
            setIsSubmitting(false);
            return;
        }

        try {
            const emailData = {
                to: email,
                subject: `Crypto Price Alert: ${cryptoId}`,
                body: `Your alert for ${cryptoId} at ${alertType} $${targetPrice} has been set! Current price: $${currentPrice}.`,
            };
            console.log('Sending email with data:', emailData);
            await send('service_r6gy7g6', 'template_fi827ji', emailData);
            alert('Price alert set successfully!');
            setCryptoId('');
            setTargetPrice('');
            setAlertType('above');
            setEmail('');
            setError('');
        } catch (error) {
            console.error('Error sending email:', error.response?.data || error.message);
            setError('Failed to set price alert. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Set Your Crypto Price Alerts</h2>
            {loading && <p style={styles.loadingText}>Loading cryptocurrencies...</p>}
            {error && <p style={styles.errorText}>{error}</p>}
            <form style={styles.form} onSubmit={handleSubmit}>
                <select value={cryptoId} onChange={(e) => setCryptoId(e.target.value)} required style={styles.select}>
                    <option value="">Select Cryptocurrency</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Target Price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    required
                    style={styles.input}
                />
                <select value={alertType} onChange={(e) => setAlertType(e.target.value)} style={styles.select}>
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                </select>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Setting Alert...' : 'Set Alert'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#121212',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        width: '80%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: '#ffcc00',
        fontSize: '32px',
        marginBottom: '20px',
    },
    form: {
        width: '100%',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ffcc00',
        backgroundColor: '#1f1f1f',
        color: 'white',
        fontSize: '16px',
        marginBottom: '15px',
        width: '100%',
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ffcc00',
        backgroundColor: '#1f1f1f',
        color: 'white',
        fontSize: '16px',
        marginBottom: '15px',
        width: '100%',
    },
    button: {
        padding: '12px 18px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ffcc00',
        color: '#121212',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
    },
    loadingText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
    },
};

export default PriceAlertForm;
