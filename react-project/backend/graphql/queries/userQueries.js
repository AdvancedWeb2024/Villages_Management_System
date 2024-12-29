import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/chat.css';
import '../styles/style.css';
import userImage from '../assets/images/user.webp';

// Assuming userId is dynamically fetched from localStorage, context, or Redux
const userId = localStorage.getItem('userId');  // Or useContext or useSelector depending on your app setup
const socket = io('http://localhost:4000'); // Connect to server

function Chat() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Join as a user with the current user's ID
    socket.emit('join', {
      role: 'user',
      userId: userId,  // Dynamically using the current userId
      fullName: 'You', // Replace with real user name if available
    });

    // Listen for online admins
    socket.on('onlineAdmins', (admins) => {
      setActiveAdmins(admins);
    });

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, [userId]);  // Ensure to re-run when userId changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setMessages([]); // Clear previous chat
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const message = {
        sender: 'You',
        receiverId: selectedAdmin.userId,
        message: messageText,
      };

      // Emit the message to the server
      socket.emit('sendMessage', message);

      // Update local chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', message: messageText, timestamp: new Date().toLocaleTimeString() },
      ]);

      setMessageText(''); // Clear input field
    }
  };

  const filteredAdmins = activeAdmins.filter((admin) =>
    admin.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <div key={admin.userId} onClick={() => handleAdminClick(admin)} className="admin">
                <img src={userImage} alt="Admin" className="admin-image" />
                <p className="user-name" id="adminName">
                  {admin.fullName}
                </p>
              </div>
            ))
          ) : (
            <p>No active admins found.</p>
          )}
        </div>
      </div>

      {/* Chat Block */}
      {selectedAdmin && (
        <div className="div-block" id="chat-block" style={{ display: 'block' }}>
          <h3 style={{ color: 'aliceblue' }} id="chat-with">
            Chat with: {selectedAdmin.fullName}
          </h3>
          <div className="chatting">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={msg.sender === 'You' ? 'user-message' : 'admin-message'}
                style={{
                  backgroundColor: msg.sender === 'You' ? 'red' : 'blue',
                  color: 'white',
                }}
              >
                <strong>{msg.sender}:</strong> {msg.message} <span>{msg.timestamp}</span>
              </p>
            ))}
          </div>
          <textarea
            type="text"
            rows="5"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
