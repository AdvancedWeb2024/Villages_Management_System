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

  const handleLogout = async () => {
    const storedUsername = sessionStorage.getItem('username');

    if (storedUsername) {
      // Send GraphQL mutation to update activeStatus
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              updateUserStatus(username: "${storedUsername}", activeStatus: false) {
                id
                fullName
                username
                activeStatus
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('Error logging out:', result.errors);
      } else {
        console.log('User logged out and activeStatus updated:', result.data.updateUserStatus);
      }
    }

    // Clear session storage and redirect to login page
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
