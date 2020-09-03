const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

const holidayController = require("../controllers/holiday-controller");

//get all holidays
router.get("", holidayController.getAllHolidays);
//get holidays by id
router.get("/:id", holidayController.getHolidaysById);
//get selected date
router.get("/date/:date", holidayController.selectedDate);
//add holiday
router.post("/holiday", holidayController.addHoliday);
//remove holiday
router.delete("/:id", holidayController.deleteHoliday);
//export router
module.exports = router;
