const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/config.js'); // Import your Sequelize instance
const { Village } = require('./villages.js'); // Import the Village model

class Demographic extends Model {}

Demographic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    villageName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Village, // Reference the Village model
        key: 'name',    // Foreign key references the 'name' column in villages
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    populationSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ageDistribution: {
      type: DataTypes.STRING, // Store age distribution as JSON
      allowNull: false,
    },
    genderRatios: {
      type: DataTypes.STRING, // Simple string for "Male: 51%, Female: 49%"
      allowNull: false,
    },
    growthRate: {
      type: DataTypes.STRING, // Example: "2.5%"
      allowNull: false,
    },
  },
  {
    sequelize, // Connection instance
    modelName: 'Demographic', // Model name
    tableName: 'demographics', // Table name
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Define associations
Village.hasOne(Demographic, {
  foreignKey: 'villageName',
  sourceKey: 'name',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Demographic.belongsTo(Village, {
  foreignKey: 'villageName',
  targetKey: 'name',
});

module.exports = { Demographic };
