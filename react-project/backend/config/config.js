const { Sequelize } = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize("villages management system", 
  "root",'', {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});


const db = {};
db.sequelize = sequelize;
module.exports = db;