import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';
import '../styles/style.css';
import userImage from '../assets/images/user.webp';

const socket = io('http://localhost:4000'); // Connect to the server

function Chat() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false); // Prevent double sending

  useEffect(() => {
    const fetchAdmins = async () => {
      const query = `
        query {
          getUsersByRole(role: "admin") {
            fullName
            activeStatus
          }
        }
      `;

      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const { data } = await response.json();

        if (data && data.getUsersByRole) {
          const admins = data.getUsersByRole.filter((admin) => admin.activeStatus === true); // Only active admins
          setActiveAdmins(admins);
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();

    // Listen for incoming messages
    socket.on('chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('chat_message'); // Clean up listener on component unmount
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && !sendingMessage) {
      setSendingMessage(true); // Set sending flag to true to prevent multiple sends
      const messageData = {
        sender: 'User', // Replace with actual user data
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };

      try {
        await socket.emit('chat_message', messageData); // Send message to server
        setMessages((prevMessages) => [...prevMessages, messageData]); // Add message to chat
        setNewMessage(''); // Clear input field
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setSendingMessage(false); // Reset sending flag after message is sent
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
              <div key={admin.fullName} onClick={() => handleAdminClick(admin)} className="admin">
                <img
                  src={userImage}
                  alt="Admin"
                  className="admin-image"
                />
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
              <div
                key={index}
                className={msg.sender === 'User' ? 'sender-message-container' : 'receiver-message-container'}
              >
                <p className={msg.sender === 'User' ? 'sender-name' : 'receiver-name'}>
                  <strong>{msg.sender}:</strong>
                </p>
                <p className={msg.sender === 'User' ? 'sender-msg' : 'receiver-msg'}>
                  {msg.content}
                </p>
              </div>
            ))}
          </div>

          <textarea
            type="text"
            rows="5"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} disabled={sendingMessage}>Send</button> {/* Disable button while sending */}
        </div>
      )}
    </div>
  );
}

export default Chat;
