import React, { useEffect, useState } from 'react';
import userImage from '../assets/images/user.webp';

function User() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="user">
      <img src={userImage} alt="user" className="user-img" />
      <p className="user-name" id="userName">{username || 'User Name'}</p>
      <p className="logout-btn" id="logoutButton" onClick={handleLogout}>Logout</p>
    </div>
  );
}

export default User;
