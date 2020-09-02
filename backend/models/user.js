const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    phoneNo: Sequelize.STRING,
    pay: Sequelize.INTEGER,
    userRole: Sequelize.STRING,
    dob:{type: Sequelize.DATEONLY,  allowNull: false}
  },
  { timestamps: false }
);

module.exports = User;
