 // src/auth/auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Create Auth Context
const AuthContext = createContext();

// Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false when auth state is resolved
    });

    return unsubscribe; // Clean up the listener on unmount
  }, []);

  const value = {
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Ensure the app only renders once loading is done */}
    </AuthContext.Provider>
  );
};
