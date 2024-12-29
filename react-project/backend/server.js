const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema.js');
const { sequelize } = require('./config/config.js');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST'],
  },
});

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

// Real-time chat setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for chat messages
  socket.on('chat_message', (data) => {
    console.log('Message received:', data);

    // Broadcast the message to all connected clients
    io.emit('chat_message', data);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
  server.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
    console.log('Socket.IO running on http://localhost:4000');
  });
});
