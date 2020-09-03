const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

const shiftController = require("../controllers/shift-controller");

//get all shifts for date
router.get("/:date", shiftController.getAllShifts);
//get shifts for user id
router.get("/user/:id", shiftController.getShiftsByUserId);
//insert shift
router.post("/create", shiftController.insertShift);
//remove shift
router.delete("/delete/:shiftId", shiftController.deleteShiftById);
//update shift
router.put("/update", shiftController.editShiftById);
//get shifts for date range for user
router.post("/date/range/:id", shiftController.getDateRange);
//get shifts for date range for all employees
router.post("/daterange", shiftController.getDateRangeForAllEmployees)
//approve a shift
router.put("/approve/:shiftId", shiftController.approveShift)

module.exports = router;
