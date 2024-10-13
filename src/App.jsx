 // src/App.js
import { useState } from 'react';
import './App.css';
import { HomePage } from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import NewsPage from './Pages/NewsPage';
import Header from './Componets/Header'; // Ensure the path to Header is correct
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Comparison from './Pages/Comparison';
import { PriceAlertForm } from './alert/PriceAlertForm';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Profile from './Pages/Profile'; // Import Profile page
import './styles.css';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

// src/App.jsx
import { AuthProvider } from './auth/auth'; // Ensure correct path

function App() {
  const classes = useStyles();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/Comparison" element={<Comparison />} />
            <Route path="/PriceAlertForm" element={<PriceAlertForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
