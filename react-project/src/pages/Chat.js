import React, { useEffect, useRef, useState } from 'react';
import '../styles/chat.css';
import '../styles/style.css';
import userImage from '../assets/images/user.webp';
import { request } from 'graphql-request';

function Chat() {
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const endpoint = 'http://localhost:4000/graphql';

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const loggedInUserId = parseInt(sessionStorage.getItem('id'), 10);
  const loggedInUserRole = sessionStorage.getItem('role'); // Assume role is stored in sessionStorage

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

  // Fetch admins and users function
  const fetchAdminsAndUsers = async () => {
    const query = `
      query {
        getUsersByRole(role: "admin") {
          id
          fullName
          activeStatus
        }
        getUsers {
          id
          fullName
          activeStatus
          role
        }
      }
    `;
    try {
      const response = await request(endpoint, query);
      setActiveAdmins(response.getUsersByRole || []); // Admins only
      setAllUsers(response.getUsers || []); // All users (admins and regular users)
    } catch (error) {
      console.error('Error fetching admins and users:', error);
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
    fetchMessages(loggedInUserId, admin.id);
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (newMessage.trim() && !sendingMessage) {
      setSendingMessage(true);
      const receiverId = selectedAdmin.id;

      // Add message to local state before sending (optimistic update)
      const newMsg = {
        type: 'chat',
        senderId: loggedInUserId,
        receiverId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      socketRef.current.send(JSON.stringify(newMsg));
      await addMessage(loggedInUserId, receiverId, newMessage); // Send to database

      setSendingMessage(false);
      setNewMessage(''); // Clear the input
    }
  };

  // WebSocket initialization and message handling
  useEffect(() => {
    fetchAdminsAndUsers();
    socketRef.current = new WebSocket('ws://localhost:3033');

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
  const filteredAdmins = loggedInUserRole === 'admin'
    ? allUsers.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term for all users
      )
    : activeAdmins.filter((admin) =>
        admin.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term for admins only
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
        <h3 style={{ color: 'aliceblue' }}>Available Accounts</h3>
        <div className="admins-list">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((user) => (
              <div
                key={user.id}
                onClick={() => handleAdminClick(user)}
                className="admin"
                style={{ display: 'flex', alignItems: 'center', position: 'relative' }} // Flexbox for alignment
              >
                <img src={userImage} alt="Admin" className="admin-image" />
                <canvas
                  width="10"
                  height="10"
                  ref={(canvas) => {
                    if (canvas) {
                      drawCircle(canvas, user.activeStatus);
                    }
                  }}
                  style={{
                    marginLeft: '40px', // Space between the image and the circle
                    marginRight: '10px', // Space between the circle and the username
                  }}
                />
                <p className="user-name">{user.fullName}</p>
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
                  msg.senderId === loggedInUserId
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
                  {msg.senderId === loggedInUserId ? 'You' : selectedAdmin.fullName}:
                </p>
                <p
                  style={{
                    color: msg.senderId === loggedInUserId ? '#34D198' : '#60A5FA', // Sender message color
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
