
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3033 });

let clients = []; // To track active WebSocket connections

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      const { type, senderId, receiverId, content } = parsedMessage;

      if (type === 'register') {
        // Register client with userId
        const userId = senderId; // Use senderId for registration
        clients.push({ ws, userId });
        console.log(`User ${userId} registered`);
      } else if (type === 'chat') {
        // Handle chat message
        console.log(`Message from ${senderId} to ${receiverId}: ${content}`);

        // Find the receiver's WebSocket connection
        const receiverClient = clients.find(client => client.userId === receiverId);

        if (receiverClient) {
          receiverClient.ws.send(JSON.stringify({
            senderId,
            receiverId,
            content,
            timestamp: new Date().toISOString(),
          }));
        } else {
          console.log(`Receiver ${receiverId} not connected`);
        }
      }
    } catch (err) {
      console.error('Error parsing message:', err.message);
    }
  });

  ws.on('close', () => {
    // Remove the disconnected client
    clients = clients.filter(client => client.ws !== ws);
    console.log('Client disconnected');
  });
});