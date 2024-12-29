const { Sequelize } = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize("villages management system", 
  "root","123456", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});


const db = {};
db.sequelize = sequelize;
module.exports = db;