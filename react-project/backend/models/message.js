const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../config/config.js"); // Ensure your Sequelize instance is configured
const { User } = require('./users.js'); // Import the User model

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, 
        key: 'id',   
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE', 
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, 
    modelName: 'Message', 
    tableName: 'messages',
    timestamps: true, 
  }
);

// Define Associations
User.hasMany(Message, {
  foreignKey: 'senderId',
  as: 'SentMessages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(Message, {
  foreignKey: 'receiverId',
  as: 'ReceivedMessages',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Message.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'Sender',
});
Message.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'Receiver',
});

module.exports = { Message };
