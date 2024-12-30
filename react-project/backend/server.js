const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema.js');
const { sequelize } = require('./config/config.js');
const cors = require('cors');


const app = express();

// Enable CORS
app.use(cors());

// Increase payload size limits for JSON and URL-encoded requests
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable the GraphiQL UI
  })
);


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


// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
});
