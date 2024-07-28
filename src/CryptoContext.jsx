

// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Create the context
// const CryptoContext = createContext();

// // CryptoProvider component
// export const CryptoProvider = ({ children }) => {
//   const [currency, setCurrency] = useState("INR");
//   const [symbol, setSymbol] = useState("₹");

//   useEffect(() => {
//     if (currency === "INR") setSymbol("₹");
//     else if (currency === "USD") setSymbol("$");
//   }, [currency]);

//   return (
//     <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
//       {children}
//     </CryptoContext.Provider>
//   );
// };

// // Custom hook to use the Crypto context
// export const useCrypto = () => useContext(CryptoContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const CryptoContext = createContext();

export const useCrypto = () => {
  return useContext(CryptoContext);
};

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
    // Add more currencies as needed
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
};



