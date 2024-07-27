// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Create the context
// const Crypto = createContext();

// // CryptoContext component
// export const CryptoContext = ({ children }) => {
//   const [currency, setCurrency] = useState("INR");
//   const [symbol, setSymbol] = useState("₹");

//   useEffect(() => {
//     if (currency === "INR") setSymbol("₹");
//     else if (currency === "USD") setSymbol("$");
//   }, [currency]);

//   return (
//     <Crypto.Provider value={{ currency, setCurrency, symbol }}>
//       {children}
//     </Crypto.Provider>
//   );
// };

// // Custom hook to use the Crypto context
// export const useCrypto = () => {
//   return useContext(Crypto);
// };

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const CryptoContext = createContext();

// CryptoProvider component
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook to use the Crypto context
export const useCrypto = () => useContext(CryptoContext);




// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Create the context
// const CryptoContext = createContext();

// // CryptoContext component
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
// export const useCrypto = () => {
//   return useContext(CryptoContext);
// };
