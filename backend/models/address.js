const Sequelize = require("sequelize");
const db = require("../config/database");

const Address = db.define(
  "Address",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    houseNo: { type: Sequelize.STRING, allowNull: false },
    street: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    postcode: { type: Sequelize.STRING, allowNull: false },
  },
  { timestamps: false }
);

module.exports = Address;

