const { GraphQLString, GraphQLInt } = require('graphql');
const MessageType = require('../types/messageType.js');
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
    },
  },
  
  // Mutation to mark a message as read
  markMessageAsRead: {
    type: MessageType,
    args: {
      messageId: { type: GraphQLInt },
    },
    async resolve(parent, args) {
      const message = await Message.findOne({ where: { id: args.messageId } });
      
      if (message) {
        // Update the message to be marked as read
        message.readStatus = true;
        await message.save();
        return message;
      }
      
      throw new Error("Message not found");
    },
  },
};

module.exports = messageMutations;
