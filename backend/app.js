//import express
const express = require("express");
const bodyParser = require("body-parser");
//set express to app
const app = express();

//database connection
const db = require("./config/database");

//models
const User = require("./models/user");
const Address = require("./models/address");
const Holiday = require("./models/holiday");
const HttpError = require("./models/http-error");
const Shifts = require("./models/shifts");
const Training = require("./models/training");

//routes
const userRoutes = require("./routes/user-routes");
const holidayRoutes = require("./routes/holiday-routes");
const shiftRoutes = require("./routes/shift-routes");
const trainingRoutes = require("./routes/training-routes");

//test db connection
db.authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/training", trainingRoutes);

//could not find route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

//throw 500 error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

//relations
//address belongs to user - user has one address
Address.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Address);

Holiday.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Holiday);

Shifts.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Shifts);

Training.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Training);

//database sync
/*
db.sync({ alter: true })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  */

//export app
module.exports = app;
