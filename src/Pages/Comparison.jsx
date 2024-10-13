import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { HistoricalChart } from '../config/api'; // Ensure you have your API functions

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Comparison = () => {
  const [coins, setCoins] = useState([]);
  const [crypto1, setCrypto1] = useState('');
  const [crypto2, setCrypto2] = useState('');
  const [days, setDays] = useState(30); // Default to last month (30 days)
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('usd'); // New state for currency selection

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
      setError('Error fetching coins.');
    }
  };

  const fetchChartData = async () => {
    if (!crypto1 || !crypto2) return;

    setLoading(true);
    setError(null);
    try {
      const coin1Data = await axios.get(HistoricalChart(crypto1, days, currency));
      const coin2Data = await axios.get(HistoricalChart(crypto2, days, currency));

      const labels = coin1Data.data.prices.map((price) => new Date(price[0]));
      const dataset1 = coin1Data.data.prices.map((price) => price[1]);
      const dataset2 = coin2Data.data.prices.map((price) => price[1]);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: coins.find((coin) => coin.id === crypto1)?.name || crypto1,
            data: dataset1,
            borderColor: 'rgba(255, 205, 86, 1)', // Yellow line for Crypto 1
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
          {
            label: coins.find((coin) => coin.id === crypto2)?.name || crypto2,
            data: dataset2,
            borderColor: '#42a5f5', // Blue line for Crypto 2
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching chart data: ', error);
      setError('Error fetching chart data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]); // Re-fetch coins when currency changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crypto1 || !crypto2) {
      alert('Please select two cryptocurrencies to compare.');
      return;
    }
    fetchChartData();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crypto Comparison</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Crypto 1: </label>
          <select
            value={crypto1}
            onChange={(e) => setCrypto1(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Crypto</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Crypto 2: </label>
          <select
            value={crypto2}
            onChange={(e) => setCrypto2(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Crypto</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Time Period: </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            style={styles.select}
          >
            <option value={1}>Last Day</option>
            <option value={30}>Last Month</option>
            <option value={365}>Last Year</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Currency: </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={styles.select}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            {/* Add other currencies as needed */}
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Show Chart
        </button>
      </form>

      {loading && <p style={styles.loadingText}>Loading data...</p>}
      {error && <p style={styles.errorText}>{error}</p>}
      {chartData && !loading && (
        <div style={styles.chartContainer}>
          <Line
            data={{
              ...chartData,
              labels: chartData.labels.map((date) => date.toLocaleDateString()), // Format labels as date strings
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: { color: '#ffcc00' },
                },
                title: {
                  display: true,
                  text: `Price Comparison of Cryptocurrencies in ${currency.toUpperCase()}`,
                  color: '#ffcc00',
                },
              },
              scales: {
                x: {
                  type: 'category',
                  ticks: { color: '#ffcc00' },
                },
                y: {
                  beginAtZero: false,
                  ticks: {
                    callback: (value) => (currency === 'usd' ? `$${value}` : `₹${value}`), // Adjust for currency
                    color: '#ffcc00',
                  },
                  title: {
                    display: true,
                    text: `Price (${currency.toUpperCase()})`,
                    color: '#ffcc00',
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

// Updated styles with more vibrant and 3D-inspired design
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#1b1b1b',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc00',
    fontSize: '36px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  select: {
    marginLeft: '10px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ffcc00',
    backgroundColor: '#2b2b2b',
    color: 'white',
    fontSize: '16px',
  },
  button: {
    padding: '14px 20px',
    borderRadius: '8px',
    backgroundColor: '#ffcc00',
    border: 'none',
    color: '#1b1b1b',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  loadingText: {
    color: '#ffcc00',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  chartContainer: {
    width: '100%',
    marginTop: '20px',
  },
};

export default Comparison;
