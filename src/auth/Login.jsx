import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Sign up function
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  // Sign in function
  const handleSignIn = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  // Google sign-in function
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Signed in with Google');
    } catch (error) {
      console.error(error);
    }
  };

  // Inline CSS
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'black',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#333',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  };

  const googleButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#DB4437',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <div style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSignUp} style={buttonStyle}>Sign Up</button>
        <button onClick={handleSignIn} style={buttonStyle}>Sign In</button>
        <button onClick={signInWithGoogle} style={googleButtonStyle}>Sign In with Google</button>

        {error && <p style={errorStyle}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
 