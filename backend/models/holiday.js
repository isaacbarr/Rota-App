const Sequelize = require("sequelize");
const db = require("../config/database");

const Holiday = db.define(
  "Holiday",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {type: Sequelize.DATEONLY, allowNull:false}
  },
  { timestamps: false }
);

module.exports = Holiday;

