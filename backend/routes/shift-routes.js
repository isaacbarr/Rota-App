const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

const shiftController = require("../controllers/shift-controller");

router.get("/:date", shiftController.getAllShifts);

router.get("/user/:id", shiftController.getShiftsByUserId);

router.post("/create", shiftController.insertShift);

router.delete("/delete/:shiftId", shiftController.deleteShiftById);

router.put("/update", shiftController.editShiftById);

router.post("/date/range/:id", shiftController.getDateRange);

router.post("/daterange", shiftController.getDateRangeForAllEmployees)

router.put("/approve/:shiftId", shiftController.approveShift)

module.exports = router;
