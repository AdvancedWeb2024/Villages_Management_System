const { GraphQLList, GraphQLInt } = require('graphql');
const { Message } = require('../../models/message.js');
const MessageType = require('../types/messageType.js');
const { Op } = require('sequelize');

const messageQueries = {
  messages: {
    type:  new GraphQLList(MessageType),
    args: {  
        senderId: { type: GraphQLInt },
        receiverId: { type: GraphQLInt }, 
    },
    resolve(parent, args) {
        return Message.findAll({
            where: {
              [Op.or]: [
                { senderId: args.senderId, receiverId: args.receiverId },
                { senderId: args.receiverId, receiverId: args.senderId },
              ],
            },
            order: [['timestamp', 'ASC']], // order messages by timestamp
        });
    }
  },
  message: {
    type: MessageType,
    args: { id: { type: GraphQLInt } },
    resolve(parent, args) {
        return Message.findByPk(args.id);;
    }
  }
};

module.exports = messageQueries;