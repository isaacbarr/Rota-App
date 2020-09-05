const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const generator = require("generate-password");
const { Op } = require("sequelize");

//models
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Address = require("../models/address");
const Holidays = require("../models/holiday");
const Shifts = require("../models/shifts");
const Training = require("../models/training");

//get all users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.findAll({
      //include users address, shifts and holidays
      include: [Address, Shifts, Holidays],
    });
    //if no users return HTTP error
    if (!users) {
      //200 - as search ran successfully
      //but no users were found
      const error = new HttpError("Failed to find users", 200);
      //return error
      return next(error);
    }
    //return all users as JSON object
    return res.json(users);

  } catch (err) {
    //catch all problems
    const error = new HttpError("Server error, please try again later", 500);
    return next(error);
  }
};

//get users details by id
const getUserDetailsById = (req, res, next) => {
  User.findAll({
    include: [Address, Training],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) {
        const error = new HttpError("Could not find user", 401);
        return next(error);
      }

      return res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

//get user by id
const getUserById = (req, res, next) => {
  User.findAll({
    include: [Address, Shifts, Holidays],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) {
        const error = new HttpError("Could not find user for provided id", 401);
        return next(error);
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

//create user
const createUser = (req, res, next) => {
  //check if any errors in form exist
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input(s), check form", 422);
    return next(error);
  }

  //form values
  const {
    name,
    email,
    phoneNo,
    houseNo,
    street,
    city,
    postcode,
    pay,
    dob,
  } = req.body;

  //check if email isn't already registered
  User.findOne({ where: { email: req.body.email } }).then((result) => {
    if (result) {
      //return error to user if email already exists
      const error = new HttpError(
        "User with provided email already exists",
        403
      );
      return next(error);
    } else {
      //if not already registered
      //generate random password for user
      var generatedPassword = generator.generate({
        //length of password
        length: 20,
        //allow numbers
        numbers: true,
      });

      //hash the created password
      bcrypt.hash(generatedPassword, 10).then((hash) => {
        const userPass = generatedPassword;
        //insert user details to user table
        const user = new User({
          name: name,
          password: hash, // hashed password
          email: email,
          phoneNo: phoneNo,
          pay: pay,
          userRole: "user",
          dob: dob,
        });
        user
          .save()
          .then((result) => {
            //use created user id to store address information
            const userId = result.id;
            const userAddress = new Address({
              houseNo: houseNo,
              street: street,
              city: city,
              postcode: postcode,
              UserId: userId,
            });
            userAddress.save().then((result) => {
              //send email to user with welcome message
              //and generated password
              let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "40106143.final.project@gmail.com", // generated ethereal user
                  pass: "FinalPro2020", // generated ethereal password
                },
              });

              var mailOptions = {
                from: "Rota-App",
                to: email,
                subject: "Welcome to Rota-App",
                html: `<h1>Hi ${name}!</h1> <br> <p>Welcome to rota-app.</p> <br> <p>Your password is ${userPass}. Please use it to log in. </p>`,
              };
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err);
                  const error = new HttpError("Problem sending mail", 400);
                  return next(error);
                }
              });
              //return user
              res.status(200).json({
                user: user,
              });
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      });
    }
  });
};

//log in user
const login = (req, res, next) => {
  let fetchedUser;
  //Find a user where email === email input from user
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        //if no user exists return error
        const error = new HttpError(
          "Could not find user for the provided email",
          401
        );
        return next(error);
      }
      fetchedUser = user;
      //compare user password with user input password and
      //password in db
      return bcrypt.compare(req.body.password, user.password);
    })
    //if user exists and password match
    .then((result) => {
      if (!result) {
        //if user exists and password don't match return HTTP error
        const error = new HttpError(
          "Password did not match, please try again",
          401
        );
        return next(error);
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser.id },
        "jwt_verity_password",
        { expiresIn: "1h" }
      );
      //return userID, token and userRole
      return res.status(200).json({
        token: token,
        userStatus: fetchedUser.userRole,
        userId: fetchedUser.id,
      });
    })
    //catch any unknown errors and return as HTTP error
    .catch((err) => {
      return res.status(401).json({
        message: "Sign in failed, please try again later",
      });
    });
};

//update user and user role
const updateUserAndRole = async (req, res, next) => {
  const {
    name,
    email,
    phoneNo,
    pay,
    city,
    houseNo,
    street,
    postcode,
    userRole,
  } = req.body;
  try {
    const updateUserById = await User.update(
      {
        name,
        email,
        phoneNo,
        pay,
        userRole,
      },
      { where: { id: req.params.id } }
    );

    if (!updateUserById) {
      const error = new HttpError("Problem finding User", 202);
      return next(error);
    }

    //fetch update data
    const updateAddress = await Address.update(
      {
        city,
        street,
        houseNo,
        postcode,
      },
      { where: { UserId: req.params.id } }
    );

    if (!updateAddress) {
      const error = new HttpError("Problem updating address", 202);
      return next(error);
    }

    const updateDatedPerson = await User.findAll({
      where: { id: req.params.id },
      include: Address,
    });

    return res.status(200).json(updateDatedPerson);
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

//update user
const updateUser = async (req, res, next) => {
  const {
    name,
    email,
    phoneNo,
    pay,
    city,
    houseNo,
    street,
    postcode,
  } = req.body;
  try {
    const updateUserById = await User.update(
      {
        name,
        email,
        phoneNo,
        pay,
      },
      { where: { id: req.params.id } }
    );

    if (!updateUserById) {
      const error = new HttpError("Problem finding User", 202);
      return next(error);
    }

    //fetch update data
    const updateAddress = await Address.update(
      {
        city,
        street,
        houseNo,
        postcode,
      },
      { where: { UserId: req.params.id } }
    );

    if (!updateAddress) {
      const error = new HttpError("Problem updating address", 202);
      return next(error);
    }

    const updateDatedPerson = await User.findAll({
      where: { id: req.params.id },
      include: Address,
    });
    return res.status(200).json(updateDatedPerson);
  } catch (err) {
    const error = new HttpError("Server error, please try again", 500);
    return next(error);
  }
};

//update user pass
const updateUserPass = (req, res, next) => {
  let fetchedUser;

  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        const error = new HttpError(
          "Could not find user for the provided id",
          401
        );
        return next(error);
      }

      fetchedUser = user;
      //check current pass and user pass match
      return bcrypt.compare(req.body.currentPass, user.password);
    })
    .then((result) => {
      if (!result) {
        const error = new HttpError(
          "Current password does not match our records",
          401
        );
        return next(error);
      }

      //hash updated pass word
      bcrypt.hash(req.body.updatedPass, 10).then((hash) => {
        User.update({ password: hash }, { where: { id: req.params.id } }).then(
          (result) => {
            if (!result) {
              const error = new HttpError("Problem updating password", 401);
              return next(error);
            }

            return res.status(200).json({ message: "Password updated" });
          }
        );
      });
    })

    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

//reset pass
const resetUserPass = (req, res, next) => {
  let fetchedUser;

  User.findOne({
    //check multiple input match records
    //in database - ensure security
    where: {
      [Op.and]: [
        { email: req.body.email },
        { dob: req.body.dob },
        { name: req.body.name },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        const error = new HttpError(
          "Could not reset password, some details are incorrect",
          401
        );
        return next(error);
      }

      fetchedUser = user;
    })
    .then((result) => {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        User.update(
          { password: hash },
          { where: { name: req.body.name } }
        ).then((result) => {
          if (!result) {
            const error = new HttpError("Problem updating password", 401);
            return next(error);
          }

          return res.status(200).json({ message: "Password updated" });
        });
      });
    })

    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

//delete user
const deleteUser = (req, res, next) => {
  const userId = req.params.id;
  User.destroy({ where: { id: userId } })
    .then((result) => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      const error = new HttpError("Server error, please try again", 500);
      return next(error);
    });
};

//export all methods to be use in routes
exports.createUser = createUser;
exports.getUserDetailsById = getUserDetailsById;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.login = login;
exports.updateUser = updateUser;
exports.updateUserAndRole = updateUserAndRole;
exports.updateUserPass = updateUserPass;
exports.resetUserPass = resetUserPass;
exports.deleteUser = deleteUser;
