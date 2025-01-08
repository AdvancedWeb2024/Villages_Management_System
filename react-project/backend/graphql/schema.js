const { GraphQLSchema ,GraphQLObjectType} = require('graphql');
const villageQueries = require('./queries/villageQueries');
const imageQueries = require('./queries/imageQueries');
const demographicQueries = require('./queries/demographicQueries');
const villageMutations = require('./mutations/villageMutations');
const imageMutations = require('./mutations/imageMutations');
const demographicMutations = require('./mutations/demographicMutations');
const userQueries = require('./queries/userQueries');1
const userMutations = require('./mutations/userMutations');
const messageQueries = require('./queries/messageQueries');
const messageMutations = require('./mutations/messageMutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...villageQueries,
    ...imageQueries,
    ...userQueries,
    ...demographicQueries,
    ...messageQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...villageMutations,
    ...imageMutations,
    ...userMutations,
    ...demographicMutations,
    ...messageMutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
