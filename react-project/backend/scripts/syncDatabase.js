const { sequelize } = require("../config/config.js");
const {Village}=require("../models/villages.js")
const {Image}=require("../models/images.js")
const {Demographic}=require("../models/demographic.js");

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized with changes.");
  });