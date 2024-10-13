import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { useCrypto } from "../CryptoContext"; // Custom hook to get currency context

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  avatar: {
    marginLeft: 15,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,
  },
  buttonList: {
    listStyle: 'none',
    display: 'flex',
    gap: '10px',
    marginRight: '20px',
  },
  button: {
    backgroundColor: '#1a1a1d',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease', // Smooth transition for hover
    '&:hover': {
      backgroundColor: '#d4af37', // Light golden color on hover
    },
  },
  icon: {
    marginRight: '5px',
  }
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const classes = useStyles();
  const { currency, setCurrency } = useCrypto(); // Custom hook for currency handling
  const navigate = useNavigate(); // Use useNavigate for routing

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page or perform any desired action
  };

  return (
    <>
      <div className="menubar">
        <ThemeProvider theme={darkTheme}>
          <AppBar color="transparent" position="static">
            <Container>
              <Toolbar>
                <Typography
                  onClick={() => navigate(`/`)} // Navigate to home on click
                  variant="h6"
                  className={classes.title}
                >
                  Crypto Hunter
                </Typography>

                <ul className={classes.buttonList}>
                  <li>
                    <Link to="/news" className={classes.button}>
                      <i className="fa fa-newspaper-o" aria-hidden="true" className={classes.icon}></i>News
                    </Link>
                  </li>
                  <li>
                    <Link to="/Comparison" className={classes.button}>
                      <i className="fa fa-exchange" aria-hidden="true" className={classes.icon}></i>Comparison
                    </Link>
                  </li>
                  <li>
                    <Link to="/PriceAlertForm" className={classes.button}>
                      <i className="fa fa-bell" aria-hidden="true" className={classes.icon}></i>Alert
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className={classes.button}>
                      <i className="fa fa-sign-in" aria-hidden="true" className={classes.icon}></i>Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout" className={classes.button}>
                      <i className="fa fa-sign-out" aria-hidden="true" className={classes.icon}></i>Logout
                    </Link>
                  </li>
                </ul>

                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  style={{ width: 100, height: 40, marginLeft: 15 }}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                {/* Avatar as a button */}
                <button className={classes.avatar} onClick={handleProfileClick}>
                  <Avatar 
                    alt="User Profile" 
                    src="p1.png" // Replace with actual profile image URL
                  />
                </button>
              </Toolbar>
            </Container>
          </AppBar>
        </ThemeProvider>
      </div>
    </>
  );
};
export default Header;