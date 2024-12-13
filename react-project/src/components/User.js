import React from 'react';
import userImage from '../assets/images/user.webp';
function User() {
  return (
    <div className="user">
      <img src={userImage} alt="user" className="user-img" />
      <p className="user-name" id="userName">User Name</p>
      <p className="logout-btn" id="logoutButton">Logout</p>
    </div>
  );
}

export default User;
