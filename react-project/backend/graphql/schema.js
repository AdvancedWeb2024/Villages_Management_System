const { GraphQLSchema ,GraphQLObjectType} = require('graphql');
const villageQueries = require('./queries/villageQueries');
const imageQueries = require('./queries/imageQueries');
const demographicQueries = require('./queries/demographicQueries');
const villageMutations = require('./mutations/villageMutations');
const imageMutations = require('./mutations/imageMutations');
const demographicMutations = require('./mutations/demographicMutations');

const userQueries = require('./queries/userQueries');

const userMutations = require('./mutations/userMutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...villageQueries,
    ...imageQueries,
    ...userQueries,
    ...demographicQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...villageMutations,
    ...imageMutations,
    ...userMutations,
    ...demographicMutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
