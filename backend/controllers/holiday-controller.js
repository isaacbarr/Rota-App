const HttpError = require("../models/http-error");

const Holiday = require("../models/holiday");

const getAllHolidays = (req, res, next) => {
  Holiday.findAll()
    .then((result) => {
      if (!result) {
        const error = new HttpError("No holidays", 401);
        return next(error);
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server errors, please try again", 500);
      return next(error);
    });
};

const getHolidaysById = (req, res, next) => {
  const userId = req.params.id;

  Holiday.findAll({ where: { userId: userId }, order: [["date", "DESC"]] })
    .then((result) => {
      if (!result) {
        const error = new HttpError("The user has no holidays", 401);
        return next(error);
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};



const selectedDate = (req, res, next) => {
  Holiday.findAll({ where: { date: req.params.date } })
    .then((result) => {
      if (!result) {
        const error = new HttpError("No holidays", 200);
        return next(error);
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

const addHoliday = async (req, res, next) => {
  const { date, userId } = req.body;

  try {
    const check = await Holiday.findOne({
      where: { UserId: userId, date },
    });

    if (!check) {
      const create = await Holiday.create({ date, UserId: userId });

      if (!create) {
        const error = new HttpError("Problem creating holiday", 401);
        return next(error);
      }

      return res.status(200).json(create);
    }

    if (check) {
      const error = new HttpError(
        "You have already requested this day off",
        401
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

const deleteHoliday = (req, res, next) => {
  Holiday.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({ message: "Shift deleted successfully" });
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

exports.getAllHolidays = getAllHolidays;
exports.getHolidaysById = getHolidaysById;
exports.selectedDate = selectedDate;
exports.addHoliday = addHoliday;
exports.deleteHoliday = deleteHoliday;
