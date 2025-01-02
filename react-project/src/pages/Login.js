import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles_in_up.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authenticateUser = async (username, password) => {
    const query = `
      query AuthenticateUser($username: String!, $password: String!) {
        authenticateUser(username: $username, password: $password) {
          id
          username
          role
          activeStatus
        }
      }
    `;
    const variables = { username, password };

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.authenticateUser;
    } catch (error) {
      alert('Error logging in: ' + error.message);
      return null;
    }
  };

  const updateUserStatus = async (username) => {
    const updateStatusQuery = `
      mutation UpdateActiveStatus($username: String!, $activeStatus: Boolean!) {
        updateUserStatus(username: $username, activeStatus: $activeStatus) {
          id
          username
          activeStatus
        }
      }
    `;
    const updateVariables = { username, activeStatus: true };

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: updateStatusQuery, variables: updateVariables }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.updateUserStatus;
    } catch (error) {
      alert('Error updating user status: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await authenticateUser(username, password);

    if (user) {
      // Update activeStatus to true (1) after successful login
      const updatedUser = await updateUserStatus(user.username);

      if (updatedUser) {
        // Set user details in sessionStorage
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('role', user.role);
        onLogin(user.role);

        navigate('/overview');
      } else {
        alert('Failed to update user status. Please try again later.');
      }
    } else {
      alert('Account is inactive. Please contact support.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="footer-text">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
