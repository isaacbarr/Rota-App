const HttpError = require("../models/http-error");

const Training = require("../models/training");

const getAll = (req, res, next) => {
  Training.findAll()
    .then((result) => {
      if (!result) {
        const error = new HttpError("No training found", 400);
        return next(error);
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

const getTrainingByUserId = (req, res, next) => {
  Training.findAll({ where: { UserId: req.params.id } })
    .then((result) => {
      if (!result) {
        const error = new HttpError("No training for user found", 401);
        return next(error);
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

const addTrainingForUser = async (req, res, next) => {
  try {
    const findTraining = await Training.findOne({
      where: {
        UserId: req.params.id,
        training: req.body.training,
      },
    });

    if (findTraining) {
      const error = new HttpError(
        "training for this user has already been recorded",
        401
      );
      return next(error);
    }

    if (!findTraining) {
      const insertTraining = await Training.create({
        training: req.body.training,
        UserId: req.params.id,
        dateCompleted: req.body.date,
      });

      if (!insertTraining) {
        const error = new HttpError("Problem creating training for user", 401);
        return next(error);
      }

      return res.status(200).json(insertTraining);
    }
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

exports.getAll = getAll;
exports.getTrainingByUserId = getTrainingByUserId;
exports.addTrainingForUser = addTrainingForUser;
