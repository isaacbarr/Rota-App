const express = require("express");
const router = express.Router();
//const { check } = require("express-validator");

const holidayController = require("../controllers/holiday-controller");

router.get("", holidayController.getAllHolidays);

router.get("/:id", holidayController.getHolidaysById);

router.get("/date/:date", holidayController.selectedDate);

router.post("/holiday", holidayController.addHoliday);

router.delete("/:id", holidayController.deleteHoliday);
module.exports = router;
