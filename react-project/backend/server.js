const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema.js');
const { sequelize } = require('./config/config.js');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // Enable the GraphiQL UI
}));

sequelize.sync({ force: false }).then(() => {
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
});
