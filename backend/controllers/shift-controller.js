const HttpError = require("../models/http-error");
const Shifts = require("../models/shifts");
const User = require("../models/user");
const { Op } = require("sequelize");

// get all shifts for all users
const getAllShifts = (req, res, next) => {
  Shifts.findAll({ where: { date: req.params.date }, include: User })
    .then((shifts) => {
      if (!shifts) {
        const error = new HttpError("No shifts", 200);
        return next(error);
      }
      res.status(200).json(shifts);
    })
    .catch((err) => {
      res.json(err);
    });
};

//get shifts by user id
const getShiftsByUserId = (req, res, next) => {
  Shifts.findAll({
    where: { UserId: req.params.id },
    order: [["date", "DESC"]],
  })
    .then((shifts) => {
      if (!shifts) {
        const error = new HttpError("No shifts", 200);
        return next(error);
      }
      res.status(200).json(shifts);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//create shift for user
const insertShift = async (req, res, next) => {
  const { date, startTime, finishTime, userId, area } = req.body;

  try {
    const createShift = await Shifts.create({
      date,
      startTime,
      finishTime,
      UserId: userId,
      area,
    });

    if (!createShift) {
      const error = new HttpError("Problem creating shift", 202);
      return next(error);
    }

    const fetchShiftForUser = await Shifts.findAll({
      include: User,
      where: { id: createShift.id },
    });

    if (!fetchShiftForUser) {
      const error = new HttpError("Problem finding shifts for user", 202);
      return next(error);
    }
    return res.status(200).json(fetchShiftForUser);
  } catch (err) {

    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

//remove shift by id
const deleteShiftById = (req, res, next) => {
  Shifts.destroy({ where: { id: req.params.shiftId } })
    .then((result) => {
      res.status(200).json({ message: "Shift deleted successfully" });
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

//edit shift by shift id
const editShiftById = async (req, res, next) => {
  const { startTime, finishTime } = req.body;

  try {
    const edit = await Shifts.update(
      { startTime, finishTime },
      { where: { id: req.body.shiftId } }
    );

    if (!edit) {
      const error = new HttpError("Problem updating shift", 500);
      return next(error);
    }

    const getShift = await Shifts.findAll({
      where: { id: req.body.shiftId },
      include: User,
    });

    if (!getShift) {
      const error = new HttpError("Problem getting shift", 404);
      return next(error);
    }
    return res.status(200).json(getShift);
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

//find shifts for date range
const getDateRange = (req, res, next) => {
  const { startWeek, endWeek } = req.body;

  Shifts.findAll({
    where: {
      [Op.and]: [
        { UserId: req.params.id },
        {
          date: {
            [Op.between]: [startWeek, endWeek],
          },
        },
      ],
    },
    include: User,
    order: [["date", "DESC"]],
  })
    .then((result) => {
      if (!result) {
        const error = new HttpError("No shifts", 200);
        return next(error);
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//date range for all employees
const getDateRangeForAllEmployees = (req, res, next) => {
  const { startWeek, endWeek } = req.body;

  Shifts.findAll({
    where: {
      date: {
        [Op.between]: [startWeek, endWeek],
      },
    },
    include: User,
    order: [["date", "DESC"]],
  })
    .then((result) => {
      if (!result) {
        const error = new HttpError("No shifts", 200);
        return next(error);
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

//approve shift
const approveShift = async (req, res, next) => {
  try {
    const approvedShift = await Shifts.update(
      { approved: req.body.approved },
      { where: { id: req.params.shiftId } }
    );

    if (!approvedShift) {
      const error = new HttpError("Could not find shift", 200);
      return next(error);
    }

    return res.status(200).json(approvedShift);
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

exports.getAllShifts = getAllShifts;
exports.getShiftsByUserId = getShiftsByUserId;
exports.insertShift = insertShift;
exports.deleteShiftById = deleteShiftById;
exports.editShiftById = editShiftById;
exports.getDateRange = getDateRange;
exports.getDateRangeForAllEmployees = getDateRangeForAllEmployees;
exports.approveShift = approveShift;
