const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config.js'); // Importing the Sequelize instance

class Village extends Model {}

Village.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Using the external Sequelize instance
    modelName: 'Village',
    tableName: 'villages',
    timestamps: true,
  }
);

module.exports = {Village};
