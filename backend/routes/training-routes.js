const express = require("express");
const router = express.Router();


const trainingController = require("../controllers/training-controller");

router.get("", trainingController.getAll);

router.get("/:id", trainingController.getTrainingByUserId)

router.post("/:id", trainingController.addTrainingForUser);

module.exports = router;
