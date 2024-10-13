import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/auth'; // Custom hook for authentication
import { makeStyles, Avatar, Typography, List, ListItem, ListItemText, Button, Container, Paper } from '@material-ui/core';
import axios from 'axios';
import { SingleCoin } from '../config/api'; // API to fetch coin details
import { useCrypto } from '../CryptoContext'; // For watchlist
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh', // Adjusted the height to move content up
    backgroundColor: '#1E1E2F', // Darker background for contrast
    padding: theme.spacing(2), // Reduced padding for a more compact layout
  },
  avatar: {
    width: '120px',
    height: '120px',
    backgroundColor: '#FFC107', // Brighter yellow background for the avatar
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#1E1E2F', // Dark text to contrast with the yellow background
    marginBottom: theme.spacing(2),
  },
  email: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#EAEAEA', // Light grey for the email to stand out against the dark background
    marginBottom: theme.spacing(4),
  },
  watchlistTitle: {
    fontWeight: 'bold',
    color: '#FFC107', // Golden color for watchlist title
    marginBottom: theme.spacing(1),
    fontSize: '24px', // Increased font size for prominence
  },
  watchlistContainer: {
    backgroundColor: '#2E2E40', // A slightly lighter color for the container background
    borderRadius: '10px',
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: '500px', // Increased max-width to make the list box bigger
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Added shadow for depth
  },
  watchlist: {
    maxHeight: '500px', // Increased height for the list
    overflowY: 'scroll',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#FFC107', // Yellow highlight on hover
      color: '#1E1E2F', // Dark text on hover for readability
    },
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    transition: 'background-color 0.3s ease',
  },
  coinName: {
    fontWeight: 'bold',
    color: '#EAEAEA', // Lighter color for the coin name
  },
  coinPrice: {
    color: '#FFD700', // Golden price text
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: theme.spacing(4),
    backgroundColor: '#FFC107', // Yellow background for the button
    color: '#1E1E2F', // Dark text for contrast
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: theme.spacing(1.5, 4),
    '&:hover': {
      backgroundColor: '#FFD54F', // Lighter yellow on hover
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { user, logout } = useAuth(); // Fetch the authenticated user and logout function
  const { watchlist } = useCrypto(); // Get the watchlist from CryptoContext
  const [watchlistDetails, setWatchlistDetails] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch details of coins in the watchlist
  const fetchWatchlistDetails = async () => {
    try {
      const promises = watchlist.map((coinId) => axios.get(SingleCoin(coinId))); // Fetch data for each coin
      const coinDataResponses = await Promise.all(promises);
      const coinData = coinDataResponses.map((response) => response.data);
      setWatchlistDetails(coinData);
    } catch (error) {
      console.error('Error fetching watchlist coin data', error);
    }
  };

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchWatchlistDetails();
    }
  }, [watchlist]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  // Function to handle navigation to the selected coin's detail page
  const handleCoinClick = (coinId) => {
    navigate(`/coins/${coinId}`); // Navigate to the coin detail page using the coin's ID
  };

  return (
    <Container className={classes.profileContainer}>
      <Avatar className={classes.avatar}>{user.email[0].toUpperCase()}</Avatar>
      <Typography className={classes.email}>{user.email}</Typography>

      <Typography variant="h6" className={classes.watchlistTitle}>Watchlist</Typography>
      <Paper className={classes.watchlistContainer}>
        <List className={classes.watchlist}>
          {watchlistDetails.length ? (
            watchlistDetails.map((coin) => (
              <ListItem
                button
                key={coin.id}
                className={classes.listItem}
                onClick={() => handleCoinClick(coin.id)}
              >
                <ListItemText
                  primary={<span className={classes.coinName}>{coin.name}</span>}
                  secondary={
                    <span className={classes.coinPrice}>
                      Price: ${coin.market_data.current_price.usd.toFixed(2)}
                    </span>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Your watchlist is empty." />
            </ListItem>
          )}
        </List>
      </Paper>

      <Button variant="contained" className={classes.logoutButton} onClick={logout}>
        LOG OUT
      </Button>
    </Container>
  );
};

export default Profile;
