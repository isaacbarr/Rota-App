const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", "root", {
  port: 8889,
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
