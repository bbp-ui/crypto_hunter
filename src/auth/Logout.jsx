import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { grey } from '@material-ui/core/colors';

const Logout = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);

  // Function to handle the sign-out process
  const handleLogout = async () => {
    try {
      // Sign out the user (whether Google, email/password, or other providers)
      await signOut(auth);
      setIsSignedOut(true);

      // Optional: Reset the signed-out state after 3 seconds
      setTimeout(() => {
        setIsSignedOut(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <button className="logout-button" onClick={handleLogout}>
        Sign Out
      </button>
      {isSignedOut && (
        <div className="sign-out-message">
          <p className="animated-text">You are signed out</p>
        </div>
      )}
      <style jsx>{`
        .logout-button { 
          background-color: #ff5722;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out, transform 0.3s ease;
        }

        .logout-button:hover {
          background-color: #f44336;
          transform: scale(1.05); /* Slightly enlarge button on hover */
        }

        .sign-out-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          opacity: 0;
          animation: fadeIn 1s ease-in-out forwards; /* Keep the message visible after the animation */
        }

        .animated-text {
          font-size: 24px;
          font-weight: bold;
          color: #333; /* Dark text color for better contrast */
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Inline styles for the container
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'grey',
  backgroundImage: 'url("\public\depositphotos_339750616-stock-photo-gold-bitcoin-crypto-currency-on.jpg")', // Replace with your image path
  backgroundSize: 'cover',  // Ensures the image covers the entire background
  backgroundPosition: 'center',  // Centers the image
  backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
};


export default Logout;
