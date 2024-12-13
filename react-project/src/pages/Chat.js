import React, { useState, useEffect } from 'react';
import '../styles/chat.css';
import '../styles/style.css';
import userImage from '../assets/images/user.webp';
let adminData = [
    {name: "Asmaa Yahya",email: "noor@gmail.com",active:"y",image:userImage},
    {name: "Noor Sabri",email: "asmaa@gmail.com",active:"y",image:userImage},
    {name: "Amjad Abu-Hassan",email: "amjad@gmail.com",active:"y",image:userImage},
    {name: "Ali Kahlil",email: "ali@gmail.com",active:"n",image:userImage}];

function Chat() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    const filteredAdmins = adminData.filter(
      (admin) => admin.active === 'y' && admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setActiveAdmins(filteredAdmins);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  return (
    <div className="chat">
      <h2 className="top-head">Chat with Admins</h2>

      {/* Search Bar */}
      <input
        type="text"
        name="search-bar-chat"
        id="search-bar-chat"
        className="search-bar-chat"
        placeholder="Search for an Admin..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Available Admins */}
      <div className="div-block">
        <h3 style={{ color: 'aliceblue' }}>Available Admins</h3>
        <div className="admins-list" id="admin-container">
          {activeAdmins.length > 0 ? (
            activeAdmins.map((admin) => (
              <div key={admin.name} onClick={() => handleAdminClick(admin)} className="admin">
                <img src={admin.image} alt="user image" className="admin-image" />
                <p className="user-name" id="adminName">
                  {admin.name}
                </p>
              </div>
            ))
          ) : (
            <p>No active admins found.</p>
          )}
        </div>
      </div>

      {/* Chat Block (Visible only when an admin is selected) */}
      {selectedAdmin && (
        <div className="div-block" id="chat-block" style={{ display: 'block' }}>
          <h3 style={{ color: 'aliceblue' }} id="chat-with">
            Chat with: {selectedAdmin.name}
          </h3>
          <div className="chatting"></div>
          <textarea type="text" rows="5" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
