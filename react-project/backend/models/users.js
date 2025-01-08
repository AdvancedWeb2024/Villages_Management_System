const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config.js'); 

class User extends Model {}

User.init(
  {
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    fullName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    activeStatus: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, modelName: 'User' }
);

module.exports = { User };
