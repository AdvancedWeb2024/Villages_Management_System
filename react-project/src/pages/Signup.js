import React, { useState } from 'react';
import { request } from 'graphql-request'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/styles_in_up.css'; 

function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const endpoint = 'http://localhost:4000/graphql';

  // Handle sign-up form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!fullName || !username || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      setErrorMessage('Password must contain at least one letter and one number.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    // GraphQL mutation query
    const query = `
      mutation CreateUser($fullName: String!, $username: String!, $password: String!, $role: String! , $activeStatus: Boolean!) {
        createUser(fullName: $fullName, username: $username, password: $password, role: $role, activeStatus: $activeStatus) {
          id
          fullName
          username
          role
        }
      }
    `;


    try {
      const response = await request(endpoint, query, {
        fullName,
        username,
        password,
        role: 'user',
        activeStatus: true,
      });
      if (response) {
        alert('Sign-up successful! You can now log in.');
        navigate('/login'); // Redirect to login page after successful signup
        setFullName('');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      const errorMessage = error?.response?.errors?.[0]?.message || 'Error signing up. Please try again.';
      setErrorMessage(errorMessage);
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading && <p>Loading...</p>}
      <div className="footer-text">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
