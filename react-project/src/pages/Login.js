import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles_in_up.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch('http://localhost:4000/graphql', { // Update with your GraphQL server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        alert(result.errors[0].message);
        return;
      }

      const user = result.data.authenticateUser;
      console.log(user);

      if (user && user.activeStatus) {
        sessionStorage.setItem('username', user.username);
        console.log("login ",user.id)
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('role', user.role);
        onLogin(user.role);

        navigate('/overview');
      } else {
        alert('Account is inactive. Please contact support.');
      }
    } catch (error) {
      alert('Error logging in: ' + error.message);
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
