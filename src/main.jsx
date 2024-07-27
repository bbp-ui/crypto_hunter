
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-alice-carousel/lib/alice-carousel.css";
import { CryptoProvider } from "./CryptoContext.jsx"; // Use CryptoProvider


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>,
)
