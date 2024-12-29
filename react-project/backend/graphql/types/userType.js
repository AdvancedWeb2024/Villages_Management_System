// userType.js
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    fullName: { type: GraphQLString },
    role: { type: GraphQLString },  
    activeStatus: { type: GraphQLBoolean },
  }),
});

module.exports = UserType;
