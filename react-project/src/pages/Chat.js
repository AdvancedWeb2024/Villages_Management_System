import React, { useEffect, useRef, useState } from 'react';
import '../styles/chat.css';
import '../styles/style.css';
import userImage from '../assets/images/user.webp';
import { request } from 'graphql-request';

function Chat() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const endpoint = 'http://localhost:4000/graphql';

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add message function
  const addMessage = async (senderId, receiverId, message) => {
    const mutation = `
      mutation AddMessage($senderId: Int!, $receiverId: Int!, $content: String!) {
        addMessage(senderId: $senderId, receiverId: $receiverId, content: $content) {
          id
          senderId
          receiverId
          content
          timestamp
        }
      }
    `;
    try {
      const response = await request(endpoint, mutation, {
        senderId,
        receiverId,
        content: message,
      });

      if (response && response.addMessage) {
        setMessages((prevMessages) => [...prevMessages, response.addMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch admins function
  const fetchAdmins = async () => {
    const query = `
      query {
        getUsersByRole(role: "admin") {
          id
          fullName
          activeStatus
        }
      }
    `;
    try {
      const response = await request(endpoint, query);
      setActiveAdmins(response.getUsersByRole || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  // Fetch messages function
  const fetchMessages = async (senderId, receiverId) => {
    const query = `
      query GetMessages($senderId: Int!, $receiverId: Int!) {
        messages(senderId: $senderId, receiverId: $receiverId) {
          id
          senderId
          receiverId
          content
          timestamp
        }
      }
    `;
    try {
      const response = await request(endpoint, query, { senderId, receiverId });
      setMessages(response.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle admin click
  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    const userId = parseInt(sessionStorage.getItem('id'), 10); // Assuming user ID is stored in sessionStorage
    fetchMessages(userId, admin.id);
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (newMessage.trim() && !sendingMessage) {
      setSendingMessage(true);
      const senderId = parseInt(sessionStorage.getItem('id'), 10);
      const receiverId = selectedAdmin.id;

      // Add message to local state before sending (optimistic update)
      const newMsg = {
        type: 'chat',
        senderId,
        receiverId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      socketRef.current.send(JSON.stringify(newMsg));
      await addMessage(senderId, receiverId, newMessage); // Send to database

      setSendingMessage(false);
      setNewMessage(''); // Clear the input
    }
  };

  // WebSocket initialization and message handling
  useEffect(() => {
    fetchAdmins();
    socketRef.current = new WebSocket('ws://localhost:3033');
    const loggedInUserId = parseInt(sessionStorage.getItem('id'), 10);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
      socketRef.current.send(
        JSON.stringify({ type: 'register', senderId: loggedInUserId })
      );
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (
        selectedAdmin &&
        (receivedMessage.senderId === selectedAdmin.id ||
          (receivedMessage.receiverId === loggedInUserId &&
            receivedMessage.senderId === selectedAdmin.id))
      ) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socketRef.current.close();
    };
  }, [selectedAdmin]);

  // Filter admins based on search term
  const filteredAdmins = activeAdmins.filter((admin) =>
    admin.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Canvas for drawing green circle
  const drawCircle = (canvas, isActive) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
    ctx.beginPath();
    ctx.arc(5, 5, 5, 0, Math.PI * 2); // Draw a circle at the center
    ctx.fillStyle = isActive ? '#18ae0b' : 'transparent'; // Set color based on active status
    ctx.fill();
  };
  
  

  return (
    <div className="chat">
      <h2 className="top-head">Chat with Admins</h2>

      <input
        type="text"
        placeholder="Search for an Admin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-chat"
      />

      <div className="div-block">
        <h3 style={{ color: 'aliceblue' }}>Available Admins</h3>
        <div className="admins-list">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <div
              key={admin.id}
              onClick={() => handleAdminClick(admin)}
              className="admin"
              style={{ display: 'flex', alignItems: 'center', position: 'relative' }} // Flexbox for alignment
            >
              <img src={userImage} alt="Admin" className="admin-image" />
              <canvas
                width="10"
                height="10"
                ref={(canvas) => {
                  if (canvas) {
                    drawCircle(canvas, admin.activeStatus);
                  }
                }}
                style={{
                  marginLeft: '40px', // Space between the image and the circle
                  marginRight: '10px', // Space between the circle and the username
                }}
              />
              <p className="user-name">{admin.fullName}</p>
            </div>
            


            
            ))
          ) : (
            <p>No admins available</p>
          )}
        </div>
      </div>

      {selectedAdmin && (
        <div className="div-block">
          <h3 style={{ color: 'aliceblue' }}>Chat with: {selectedAdmin.fullName}</h3>
          <div className="chatting">
            {messages.map((msg) => (
              <div
                key={`${msg.senderId}-${msg.receiverId}-${msg.timestamp}`} // Unique key for each message
                className={
                  msg.senderId === parseInt(sessionStorage.getItem('id'), 10)
                    ? 'sender-message-container'
                    : 'receiver-message-container'
                }
              >
                <p
                  style={{
                    color: '#9CA3AF', // Name color
                    fontWeight: 'bold',
                  }}
                >
                  {msg.senderId === parseInt(sessionStorage.getItem('id'), 10)
                    ? 'You'
                    : selectedAdmin.fullName}
                  :
                </p>
                <p
                  style={{
                    color:
                      msg.senderId === parseInt(sessionStorage.getItem('id'), 10)
                        ? '#34D198' // Sender message color
                        : '#60A5FA', // Receiver message color
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '8px',
                    padding: '5px 10px',
                  }}
                >
                  {msg.content}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <textarea
            rows="5"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} disabled={sendingMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
