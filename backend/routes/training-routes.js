const express = require("express");
const router = express.Router();

//get training controller
const trainingController = require("../controllers/training-controller");
//get all training
router.get("", trainingController.getAll);
//get training levels for user
router.get("/:id", trainingController.getTrainingByUserId)
//insert training for user
router.post("/:id", trainingController.addTrainingForUser);
//export router
module.exports = router;
