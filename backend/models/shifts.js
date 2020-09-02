const Sequelize = require("sequelize");
const db = require("../config/database");

const Shifts = db.define(
  "Shifts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {type: Sequelize.DATEONLY, allowNull:false},
    startTime: { type: Sequelize.TIME, allowNull: false},
    finishTime: { type: Sequelize.TIME, allowNull: false},
    area: {type: Sequelize.STRING, allowNull: false},
    approved: {type : Sequelize.BOOLEAN, allowNull: true},
  },
  { timestamps: false }
);

module.exports = Shifts;
