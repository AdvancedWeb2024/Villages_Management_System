const { GraphQLString,GraphQLInt } = require('graphql');
const MessageType  = require('../types/messageType.js');
const { Message } = require('../../models/message.js');

const messageMutations = {
  addMessage: {
    type: MessageType,
    args: {
      senderId: { type: GraphQLInt },
      receiverId: { type: GraphQLInt },
      content: { type: GraphQLString },  
    },
    resolve(parent, args) {
      return Message.create({
        senderId: args.senderId,
        receiverId: args.receiverId,
        content: args.content,
      });
    }
  }
};

module.exports = messageMutations;
