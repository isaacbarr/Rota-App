const Sequelize = require("sequelize");
const db = require("../config/database");

const Training = db.define(
  "Training",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    training: { type: Sequelize.STRING, allowNull: false },
    dateCompleted : {type: Sequelize.DATEONLY, allowNull: true},
  },
  { timestamps: false }
);


module.exports = Training;
