const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../config/config.js"); // Ensure your sequelize instance is correctly configured
const {Village} = require('./villages.js'); // Import the Village model

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Village, // Reference the Village model
        key: 'name',    // Foreign key references the 'name' column in villages
      },
      onUpdate: 'CASCADE', // Optional: Update images if village name changes
      onDelete: 'CASCADE', // Optional: Delete images if village is deleted
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Longer text field for descriptions
      allowNull: true,      // Optional field
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'Image', // Model name
    tableName: 'images', // Table name in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define Associations
Village.hasMany(Image, {
  foreignKey: 'name',
  sourceKey: 'name',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Image.belongsTo(Village, {
  foreignKey: 'name',
  targetKey: 'name',
});

module.exports = {Image};
