import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles_in_up.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const admins = [
      { username: 'admin1', password: 'adminpassword1', role: 'admin' },
      { username: 'admin2', password: 'adminpassword2', role: 'admin' },
    ];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const admin = admins.find((a) => a.username === username && a.password === password);
    if (admin) {
      sessionStorage.setItem('username', admin.username);
      sessionStorage.setItem('role', admin.role);
      onLogin(admin.role);
      navigate('/overview');
    } else {
      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('role', 'user');
        onLogin('user');
        navigate('/overview');
      } else {
        alert('Invalid username or password!');
      }
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
