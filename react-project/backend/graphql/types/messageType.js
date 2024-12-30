// messageType.js
const { GraphQLObjectType, GraphQLInt, GraphQLString,  } = require('graphql');


const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLInt },
    senderId: { type: GraphQLInt },
    receiverId: { type: GraphQLInt },
    content: { type: GraphQLString },  
    timestamp: { type: GraphQLString },
  }),
});

module.exports = MessageType;
