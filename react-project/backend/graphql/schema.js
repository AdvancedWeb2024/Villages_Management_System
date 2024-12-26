const { GraphQLSchema ,GraphQLObjectType} = require('graphql');
const villageQueries = require('./queries/villageQueries');
const imageQueries = require('./queries/imageQueries');
const demographicQueries = require('./queries/demographicQueries');
const villageMutations = require('./mutations/villageMutations');
const imageMutations = require('./mutations/imageMutations');
const demographicMutations = require('./mutations/demographicMutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...villageQueries,
    ...imageQueries,
    ...demographicQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...villageMutations,
    ...imageMutations,
    ...demographicMutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
