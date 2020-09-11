const HttpError = require("../models/http-error");
//get holiday model
const Holiday = require("../models/holiday");

//get all holidays
const getAllHolidays = (req, res, next) => {
  Holiday.findAll()
    .then((result) => {
      if (!result) {
        //no result = no holidays
        const error = new HttpError("No holidays", 401);
        return next(error);
      }

      return res.status(200).json(result);
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

//get holiday for user id
const getHolidaysById = (req, res, next) => {
  //user id from front end
  const userId = req.params.id;

  //find all holidays where userId = userId order desc
  Holiday.findAll({ where: { userId: userId }, order: [["date", "DESC"]] })
    .then((result) => {
      //no result no holidays found
      if (!result) {
        const error = new HttpError("The user has no holidays", 401);
        return next(error);
      }

      //return result
      return res.status(200).json(result);
    })
    .catch((err) => {
      //general error message
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};


//get holidays for selected date
const selectedDate = (req, res, next) => {
  //input from front end
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

//add holiday
const addHoliday = async (req, res, next) => {
  const { date, userId } = req.body;

  try {
    const check = await Holiday.findOne({
      where: { UserId: userId, date },
    });

    if (check) {
      //check the user isn't already off this day
      const error = new HttpError(
        "You have already requested this day off",
        401
      );
      return next(error);
    }


      const create = await Holiday.create({ date, UserId: userId });

      if (!create) {
        const error = new HttpError("Problem creating holiday", 401);
        return next(error);
      }

      return res.status(200).json(create);



  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

//delete holiday
const deleteHoliday = (req, res, next) => {
  Holiday.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({ message: "Holiday deleted successfully" });
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
