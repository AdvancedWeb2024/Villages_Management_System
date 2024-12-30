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




// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
});