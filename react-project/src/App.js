import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import VillageMgt from './pages/VillageMgt';
import Chat from './pages/Chat';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/main.css';
import './styles/style.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  // Simulate authentication from session storage
  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const userRole = sessionStorage.getItem('role');
    if (username) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    sessionStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setRole('');
  };

  const getDefaultRoute = () => {
    return role === 'admin' ? '/village-mgt' : '/overview';
  };

  return (
    <Router>
      <div className="app">
        {/* Pass role to Sidebar to conditionally render menu items */}
        {isAuthenticated && <Sidebar role={role} onLogout={handleLogout} />}
        <div className="content-wrapper">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to={getDefaultRoute()} /> : <Signup />
              }
            />

            {/* Protected Routes */}
            <Route
              path="/overview"
              element={isAuthenticated ? <Overview /> : <Navigate to="/login" />}
            />
            <Route
              path="/village-mgt"
              element={
                isAuthenticated && role === 'admin' ? (
                  <VillageMgt />
                ) : (
                  <Navigate to="/overview" />
                )
              }
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
            />
            <Route
              path="/gallery"
              element={isAuthenticated ? <Gallery /> : <Navigate to="/login" />}
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
