const express = require("express");
const router = express.Router();
//express validator
const { check } = require("express-validator");

//user controller
const userController = require("../controllers/user-controller");

//create user
router.post(
  "/create",
  check("name").not().isEmpty(),
  check("email").not().isEmpty().isEmail(),
  check("phoneNo").not().isEmpty(),
  userController.createUser
);
//get all users
router.get("/", userController.getUsers);
//get user by id
router.get("/:id", userController.getUserById);
//get user details by user id
router.get("/user/:id", userController.getUserDetailsById);
//login route
router.post("/login", userController.login);
//update user
router.put("/update/:id", userController.updateUser);
//update user and user role
router.put("/updateuserandrole/:id", userController.updateUserAndRole);
//update pass
router.put("/password/:id", userController.updateUserPass);
//reset pass
router.put("/resetpassword", userController.resetUserPass);
//delete user
router.delete("/delete/:id", userController.deleteUser);
//export router
module.exports = router;
