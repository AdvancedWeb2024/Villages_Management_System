import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert('Username already taken. Please choose another one.');
    } else {
      const newUser = { fullName, username, password, role: 'user' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign-up successful! You can now log in.');
      navigate('/login');
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
        <button type="submit">Sign Up</button>
      </form>
      <div className="footer-text">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
